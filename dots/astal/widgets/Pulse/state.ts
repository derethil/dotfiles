import { bind, GObject, property, register } from "astal";
import { App, Widget } from "astal/gtk3";
import { PulsePlugin, PulseResult, StaticPulsePlugin } from "./types";
import { WINDOW_NAME } from ".";

export const END_ADORNMENT_TRANSITION_DURATION = 200;

@register({ GTypeName: "PulseState" })
export class PulseState extends GObject.Object {
  // Meta properties
  static instance: PulseState;

  private plugins: PulsePlugin[] = [];
  private _results: PulseResult[] = [];

  // Properties
  declare private _endWidget: Widget.Box | null;

  @property(String)
  declare public query: string;

  @property(String)
  declare public startIcon: string;

  @property(Boolean)
  declare public showEndWidget: boolean;

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

    this.handleChangeEndWidget();
    this.handleChangeQuery();
  }

  // Public methods
  public registerPlugin(plugin: StaticPulsePlugin) {
    const command = plugin.get_default().command;
    if (!this.commands.includes(command)) this.plugins.push(plugin.get_default());
  }

  @property(Widget.Box)
  public get endWidget() {
    return this._endWidget;
  }

  public set endWidget(widget: Widget.Box | null) {
    if (widget === this._endWidget) return;
    if (widget === null) {
      this.showEndWidget = false;
      this.notify("show-end-widget");
    } else {
      this._endWidget = widget;
      this.notify("end-widget");
    }
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

  private handleChangeEndWidget() {
    bind(this, "showEndWidget").subscribe((shown) => {
      if (shown) return;
      setTimeout(() => {
        this._endWidget = null;
        this.notify("end-widget");
      }, END_ADORNMENT_TRANSITION_DURATION);
    });

    bind(this, "endWidget").subscribe((widget) => {
      if (widget === null) return;
      this.showEndWidget = true;
      this.notify("show-end-widget");
    });
  }

  private handleChangeQuery() {
    bind(this, "query").subscribe((rawQuery) => {
      const { command, args } = this.parseQuery(rawQuery);
      const plugin = this.plugins.find((plugin) => plugin.command === command);
      const plugins = plugin ? [plugin] : this.plugins;
      this._results = plugins.flatMap((plugin) => plugin.process(args));
      this.notify("results");
    });
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
