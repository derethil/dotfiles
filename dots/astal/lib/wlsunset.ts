import { bind, property, register, GObject, exec } from "astal";

@register({ GTypeName: "WaylandSunset" })
export class WLSunset extends GObject.Object {
  static instance: WLSunset;

  static get_default() {
    if (!this.instance) this.instance = new WLSunset();
    return this.instance;
  }

  static load() {
    this.get_default();
  }

  @property(Boolean)
  declare enabled: boolean;

  constructor() {
    // @ts-expect-error not typed correctly
    super({ enabled: WLSunset.active });
    this.syncServiceStatus();
  }

  private static get active() {
    try {
      return exec("systemctl --user is-active wlsunset.service") === "active";
    } catch {
      return false;
    }
  }

  private syncServiceStatus() {
    bind(this, "enabled").subscribe((enabled) => {
      exec(`systemctl --user ${enabled ? "start" : "stop"} wlsunset.service`);
    });
  }
}
