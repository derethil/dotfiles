import { GObject, property, register } from "astal";
import { Hue } from ".";

@register({ GTypeName: "HueGroup" })
export class Group extends GObject.Object {
  private POLL_INTERVAL = 1000;
  private hue: Hue;
  private _data: HueGroup;

  @property(String)
  declare id: string;

  @property(String)
  get name() {
    return this._data.name;
  }

  @property(Object)
  get lights() {
    return this.hue.lights.filter((light) =>
      this._data.lights.includes(light.id),
    );
  }

  constructor(hue: Hue, id: string, group: HueGroup) {
    // @ts-expect-error not typed properly
    super({ id });
    this.hue = hue;
    this._data = group;
    setInterval(() => this.reload(), this.POLL_INTERVAL);
  }

  @property(Boolean)
  public get on() {
    return this._data.action.on;
  }

  public set on(bool: boolean) {
    const value = bool ? "on" : "off";
    this._data.action.on = bool;
    this.notify("on");

    this.hue.cli("group", this.id, value).catch(console.error);
    this.reload().catch(console.error);

    this.lights.forEach((light) => (light.on = bool));
  }

  public toggle(bool?: boolean) {
    if (bool === undefined) {
      this.on = !this.on;
    } else {
      this.on = bool;
    }
  }

  private async reload() {
    this._data = await this.hue.cli<HueGroup>("group", this.id);
    this.notify("on");
  }
}
