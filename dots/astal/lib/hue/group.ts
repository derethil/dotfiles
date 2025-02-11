import { GObject, property, register, signal } from "astal";
import { clamp } from "utils";
import { Hue } from ".";

@register({ GTypeName: "HueGroup" })
export class Group extends GObject.Object {
  private POLL_INTERVAL = 1000 * 60 * 5;
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
    this.poll();
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

  @property(Number)
  public get brightness() {
    return this._data.action.bri;
  }

  public set brightness(value: number) {
    const clamped = clamp(Math.round(value), 0, 255);

    this._data.action.bri = clamped;
    this.notify("brightness");

    this.hue.cli("group", this.id, `=${clamped}`).catch(console.error);
    this.reload().catch(console.error);

    this.lights.forEach((light) => (light.brightness = clamped));
  }

  @signal()
  public flash() {
    this.hue.rawCli("group", this.id, "select").catch(console.error);
  }

  private async reload() {
    this._data = await this.hue.cli<HueGroup>("group", this.id);
  }

  private poll() {
    setInterval(() => {
      this.reload().catch(console.error);
      this.notify("on");
    }, this.POLL_INTERVAL);
  }
}
