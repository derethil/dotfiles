import { GObject, property, register, signal } from "astal";
import { clamp, icon } from "utils";
import { Hue, Light } from ".";

const GroupIconMap: Record<string, string> = {
  "Living Room": "couch-symbolic",
  Bedroom: "bed-symbolic",
};

@register({ GTypeName: "HueGroup" })
export class Group extends GObject.Object {
  private hue: Hue;

  private _on: boolean;
  private _brightness: number;
  private _lightIds: string[];

  // Public Properties

  @property(String)
  declare public readonly id: string;

  @property(String)
  declare public readonly name: string;

  @property(String)
  get icon() {
    return icon(GroupIconMap[this.name], "display-brightness-symbolic");
  }

  @property(Object)
  get lights() {
    return this._lightIds
      .map((id) => this.hue._lights.get(id))
      .filter(Boolean) as Light[];
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

    this.hue.cli("group", this.id, value).catch(console.error);
    this.lights.forEach((light) => (light.on = bool));
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

    this.hue.cli("group", this.id, `=${clamped}`).catch(console.error);
    this.lights.forEach((light) => (light.brightness = clamped));
  }

  // Constructor

  constructor(hue: Hue, id: string, group: HueGroup) {
    // @ts-expect-error not typed properly
    super({ id, name: group.name });

    this.hue = hue;
    this._on = group.action.on;
    this._brightness = group.action.bri;
    this._lightIds = group.lights;
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
    this.hue.cliRaw("group", this.id, "select").catch(console.error);
  }

  @signal(Object)
  public sync(data: HueGroup) {
    this._on = data.action.on;
    this._brightness = data.action.bri;

    this.notify("on");
    this.notify("brightness");
  }
}
