import { bind, GObject, property, register } from "astal";
import { Widget } from "astal/gtk3";
import { PulsePlugin, StaticPulsePlugin } from "./types";

export const END_ADORNMENT_TRANSITION_DURATION = 200;

@register({ GTypeName: "PulseState" })
export class PulseState extends GObject.Object {
  // Meta properties
  static instance: PulseState;
  private plugins: PulsePlugin[] = [];

  // Properties
  declare private _endWidget: Widget.Box | null;

  @property(String)
  declare public query: string;

  @property(String)
  declare public startIcon: string;

  @property(Boolean)
  declare showEndWidget: boolean;

  // Initialization

  static get_default() {
    if (!this.instance) this.instance = new PulseState();
    return this.instance;
  }

  constructor() {
    // @ts-expect-error - GObject not typed for Astal subclasses
    super({
      query: "",
      startIcon: "system-search",
      endWidget: null,
      showEndWidget: false,
    });

    this.handleChangeEndWidget();
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
