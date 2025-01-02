import { bind, GObject, property, register } from "astal";
import { App, Gtk, Widget } from "astal/gtk3";
import { PulsePlugin, PulseResult, StaticPulsePlugin } from "./types";
import { WINDOW_NAME } from ".";

export const TRANSITION_DURATION = 200;

@register({ GTypeName: "PulseState" })
export class PulseState extends GObject.Object {
  // Meta properties
  static instance: PulseState;

  private _plugins: PulsePlugin[] = [];
  private _results: PulseResult[] = [];

  // Properties
  @property(Widget.Box)
  declare public end: Gtk.Widget | null;

  @property(String)
  declare public query: string;

  @property(Widget.Entry)
  declare public entry: Widget.Entry | null;

  @property(Widget.Box)
  public get results() {
    return this._results.slice(0, 11);
  }

  // Initialization

  static get_default() {
    if (!this.instance) this.instance = new PulseState();
    return this.instance;
  }

  constructor() {
    super();
    this.handleChangeQuery();
  }

  // Public methods
  public registerPlugin(p: StaticPulsePlugin) {
    const plugin = p.get_default(this);
    if (!this.commands.includes(plugin.command))
      return this._plugins.push(plugin);
    console.warn(`plugin ${plugin.command} is already registered`);
  }

  public get commands() {
    return this._plugins.map((plugin) => plugin.command);
  }

  public get plugins() {
    return this._plugins;
  }

  public activate(onActivate: () => void) {
    App.toggle_window(WINDOW_NAME);
    if (onActivate) onActivate();
  }

  public clickFirst() {
    if (this._results.length === 0) return;
    const widget = this._results[0];
    widget.emit("clicked");
  }

  // Private methods

  private handleChangeQuery() {
    bind(this, "query").subscribe((rawQuery) => {
      const { command, args } = this.parseQuery(rawQuery);

      if (command === undefined && args.length === 0) {
        this._results = [];
        this.notify("results");
        this.handlePluginAdornment(undefined);
        return;
      }

      const plugin = this._plugins.find((plugin) => plugin.command === command);
      const plugins = plugin ? [plugin] : this.plugins.filter((p) => p.default);

      Promise.all(plugins.map((p) => p.process(args)))
        .then((results) => {
          this._results = results.flat();
          this.notify("results");
          this.handlePluginAdornment(plugin);
        })
        .catch((error: unknown) => {
          console.error(error);
        });
    });
  }

  private handlePluginAdornment(plugin: PulsePlugin | undefined) {
    if (!plugin && !this.end) return;
    if (!plugin && this.end) {
      this.end = null;
    } else if (plugin) {
      this.end = plugin.searchAdornment?.(true) ?? null;
    }
  }

  private parseQuery(query: string) {
    const [command, ...args] = query.split(" ");

    if (query.length === 0) return { command: undefined, args: [] };

    if (!query.startsWith(":"))
      return { command: undefined, args: query.split(" ") };

    if (this.commands.includes(command as `:${string}`))
      return { command, args };

    return { command: undefined, args: [] };
  }
}
