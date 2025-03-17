import { GObject, property, register, signal } from "astal";
import { clamp } from "utils";
import { Hue } from ".";

@register({ GTypeName: "HueLight" })
export class Light extends GObject.Object {
  private hue: Hue;

  private _on: boolean;
  private _brightness: number;

  // Public Properties

  @property(String)
  declare public readonly id: string;

  @property(String)
  declare public readonly name: string;

  @property(String)
  public readonly icon = "lamp-symbolic";

  @property(Object)
  get groups() {
    return this.hue.groups.filter((group) => group.lights.includes(this));
  }

  // Getter / Setter Pairs

  @property(Boolean)
  public get on() {
    return this._on;
  }

  public set on(bool: boolean) {
    const value = bool ? "on" : "off";
    this._on = bool;
    this.notify("on");

    this.hue.cli("light", this.id, value).catch(console.error);
  }

  @property(Number)
  public get brightness() {
    return this._brightness;
  }

  public set brightness(value: number) {
    const clamped = clamp(Math.round(value), 0, 255);

    this._brightness = clamped;
    this.notify("brightness");

    this._on = true;
    this.notify("on");

    this.hue.cli("light", this.id, `=${clamped}`).catch(console.error);
  }

  // Constructor

  constructor(hue: Hue, id: string, light: HueLight) {
    // @ts-expect-error not typed properly
    super({ id, name: light.name });
    this.hue = hue;
    this._on = light.state.on;
    this._brightness = light.state.bri;
  }

  // Public Methods

  public toggle(bool?: boolean) {
    if (bool === undefined) {
      this.on = !this.on;
    } else {
      this.on = bool;
    }
  }

  @signal()
  public flash() {
    this.hue.cliRaw("light", this.id, "select").catch(console.error);
  }

  @signal(Object)
  public sync(data: HueLight) {
    this._on = data.state.on;
    this._brightness = data.state.bri;

    this.notify("on");
    this.notify("brightness");
  }
}
