import { bind, property, register, Variable, GObject } from "astal";
import { Location } from "state/location";
import { bash, dependencies } from "utils";

@register({ GTypeName: "WaylandSunset" })
export class WLSunset extends GObject.Object {
  static instance: WLSunset;

  static get_default() {
    if (!dependencies("wlsunset"))
      throw new Error("wlsunset not found on PATH");

    if (!this.instance) this.instance = new WLSunset();
    return this.instance;
  }

  static set_default() {
    this.get_default();
  }

  @property(Boolean)
  declare enabled: boolean;

  @property(Number)
  declare lowTemperature: number;

  @property(Number)
  declare highTemperature: number;

  constructor() {
    // @ts-expect-error not typed correctly
    super({ enabled: true, lowTemperature: 2800, highTemperature: 6500 });

    let first = true;

    Variable.derive(
      [
        bind(this, "enabled"),
        bind(this, "lowTemperature"),
        bind(this, "highTemperature"),
      ],
      async (enabled, low, high) => {
        if (!first) await this.killProcess();
        if (enabled) this.startProcess(low, high);
        first = false;
      },
    );
  }

  async killProcess() {
    await bash(`killall wlsunset`).catch(console.error);
  }

  startProcess(low: number, high: number) {
    const location = Location.get_default().location;
    const command = `wlsunset -l ${location.lat} -L ${location.lon} -t ${low} -T ${high}`;
    bash(command).catch(console.error);
  }
}
