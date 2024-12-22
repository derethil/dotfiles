import { bind, GObject, property, register } from "astal";
import { App, Gtk, Widget } from "astal/gtk3";
import { PulsePlugin, PulseResult, StaticPulsePlugin } from "./types";
import { WINDOW_NAME } from ".";

export const TRANSITION_DURATION = 200;

@register({ GTypeName: "PulseState" })
export class PulseState extends GObject.Object {
  // Meta properties
  static instance: PulseState;

  private plugins: PulsePlugin[] = [];
  private _results: PulseResult[] = [];

  // Properties
  @property(Widget.Box)
  declare public endWidget: Gtk.Widget | null;

  @property(String)
  declare public query: string;

  @property(String)
  declare public startIcon: string;

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
    // @ts-expect-error - GObject not typed for Astal subclasses
    super({ startIcon: "system-search" });
    this.handleChangeQuery();
  }

  // Public methods
  public registerPlugin(plugin: StaticPulsePlugin) {
    const command = plugin.get_default().command;
    if (!this.commands.includes(command)) this.plugins.push(plugin.get_default());
  }

  public get commands() {
    return this.plugins.map((plugin) => plugin.command);
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
      const plugin = this.plugins.find((plugin) => plugin.command === command);
      const plugins = plugin ? [plugin] : this.plugins;
      this._results = plugins.flatMap((plugin) => plugin.process(args));
      this.notify("results");
      if (plugin) this.handlePluginAdornment(plugin);
    });
  }

  private handlePluginAdornment(plugin: PulsePlugin | undefined) {
    if (!plugin && !this.endWidget) return;
    if (!plugin && this.endWidget) {
      this.endWidget = null;
    } else {
      this.endWidget = plugin!.endAdornment(true);
    }
  }

  private parseQuery(query: string) {
    const empty = { command: undefined, args: [] };
    const [command, ...args] = query.split(" ");

    if (query.length === 0 || query === ":") return empty;
    if (!query.startsWith(":")) return { command: undefined, args: query.split(" ") };
    if (this.commands.includes(command as `:${string}`)) return { command, args };

    return empty;
  }
}
