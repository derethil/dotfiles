import { GObject, property, register, signal } from "astal";
import { clamp } from "utils";
import { Hue } from ".";

@register({ GTypeName: "HueLight" })
export class Light extends GObject.Object {
  private POLL_INTERVAL = 1000;
  private hue: Hue;
  private _data: HueLight;

  @property(String)
  declare id: string;

  @property(String)
  get name() {
    return this._data.name;
  }

  constructor(hue: Hue, id: string, light: HueLight) {
    // @ts-expect-error not typed properly
    super({ id });
    this.hue = hue;
    this._data = light;
    this.poll();
  }

  @property(Boolean)
  public get on() {
    return this._data.state.on;
  }

  public set on(bool: boolean) {
    const value = bool ? "on" : "off";
    this._data.state.on = bool;
    this.notify("on");

    this.hue.cli("light", this.id, value).catch(console.error);
    this.reload().catch(console.error);
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
    return this._data.state.bri;
  }

  public set brightness(value: number) {
    const clamped = clamp(Math.round(value), 0, 255);
    this._data.state.bri = clamped;
    this.notify("brightness");

    this.hue.cli("light", this.id, `=${clamped}`).catch(console.error);
    this.reload().catch(console.error);
  }

  private async reload() {
    this._data = await this.hue.cli<HueLight>("light", this.id);
  }

  @signal()
  public flash() {
    this.hue.rawCli("light", this.id, "select").catch(console.error);
  }

  private poll() {
    setInterval(() => {
      this.reload().catch(console.error);
      this.notify("on");
    }, this.POLL_INTERVAL);
  }
}
