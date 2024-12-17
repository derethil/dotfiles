import { bind, GObject, property, register } from "astal";
import { App, Widget } from "astal/gtk3";
import { PluginManager } from "./pluginManager";
import { WINDOW_NAME } from ".";

export const END_ADORNMENT_TRANSITION_DURATION = 200;

@register({ GTypeName: "PulseState" })
export class PulseState extends GObject.Object {
  // Meta properties
  static instance: PulseState;

  // Properties
  declare private _endWidget: Widget.Box | null;
  pluginManager: PluginManager;

  @property(String)
  declare public query: string;

  @property(String)
  declare public startIcon: string;

  @property(Boolean)
  declare public showEndWidget: boolean;

  @property(String)
  public get parsed() {
    const query = this.query;
    const empty = { command: undefined, args: [] };
    const [command, ...args] = query.split(" ");

    if (query.length === 0 || query === ":") return empty;
    if (!query.startsWith(":")) return { command: undefined, args: query.split(" ") };
    if (this.pluginManager.commands.includes(command as `:${string}`)) return { command, args };
    return empty;
  }

  // Initialization

  static get_default() {
    if (!this.instance) this.instance = new PulseState();
    return this.instance;
  }

  constructor() {
    // @ts-expect-error - GObject not typed for Astal subclasses
    super({ startIcon: "system-search" });
    this.pluginManager = PluginManager.get_default(this);

    this.handleChangeEndWidget();

    bind(this, "query").subscribe(() => this.notify("parsed"));
  }

  // Public methods

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

  public activate(onActivate?: () => void) {
    App.toggle_window(WINDOW_NAME);
    if (onActivate) onActivate();
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
}
