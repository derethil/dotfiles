import { GLib, GObject, property, register } from "astal";
import { bash, dependencies } from "utils";
import { Group } from "./group";
import { Light } from "./light";

const HUEADM_CONFIG_PATH = `${GLib.get_user_config_dir()}/.hueadm.json`;

@register({ GTypeName: "Hue" })
export class Hue extends GObject.Object {
  private static instance: Hue;

  private INTERVAL = 1000 * 60;

  public _lights = new Map<string, Light>();
  public _groups = new Map<string, Group>();

  @property(Boolean)
  declare enabled: boolean;

  @property(Object)
  get groups() {
    return Array.from(this._groups.values());
  }

  @property(Object)
  get lights() {
    return Array.from(this._lights.values());
  }

  static get_default() {
    if (!this.instance) this.instance = new Hue();
    return this.instance;
  }

  constructor() {
    super();
    if (dependencies("hueadm")) {
      this.enabled = true;
      this.sync().catch(console.error);
      setInterval(() => this.sync().catch(console.error), this.INTERVAL);
    }
  }

  public async cli<T extends object>(subcommand: string, ...args: string[]) {
    // prettier-ignore
    const result = await bash(["hueadm", "--config", HUEADM_CONFIG_PATH, subcommand, "-j", ...args]);
    return JSON.parse(result) as T;
  }

  public cliRaw(subcommand: string, ...args: string[]) {
    // prettier-ignore
    return bash(["hueadm", "--config", HUEADM_CONFIG_PATH, subcommand, ...args]);
  }

  public async fetch() {
    const lights = await this.cli<HueLights>("lights");
    const groups = await this.cli<HueGroups>("groups");
    return { lights, groups };
  }

  public async sync() {
    const { lights, groups } = await this.fetch();

    Object.entries(lights).forEach(([id, data]) => {
      const light = this._lights.get(id);
      if (!light) {
        this._lights.set(id, new Light(this, id, data));
      } else {
        light.on = data.state.on;
        light.brightness = data.state.bri;
      }
    });

    Object.entries(groups).forEach(([id, data]) => {
      const group = this._groups.get(id);
      if (!group) {
        this._groups.set(id, new Group(this, id, data));
      } else {
        group.on = data.action.on;
        group.brightness = data.action.bri;
      }
    });

    this.notify("lights");
    this.notify("groups");
  }
}

export { Group, Light };
