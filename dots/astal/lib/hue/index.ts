import { GLib, GObject, property, register } from "astal";
import { bash, dependencies } from "utils";
import { Group } from "./group";
import { Light } from "./light";

const HUEADM_CONFIG_PATH = `${GLib.get_user_config_dir()}/.hueadm.json`;

@register({ GTypeName: "Hue" })
export class Hue extends GObject.Object {
  private static instance: Hue;
  private _lights: Light[] = [];
  private _groups: Group[] = [];

  @property(Boolean)
  declare enabled: boolean;

  @property(Object)
  get groups() {
    return this._groups;
  }

  @property(Object)
  get lights() {
    return this._lights;
  }

  static get_default() {
    if (!this.instance) this.instance = new Hue();
    return this.instance;
  }

  constructor() {
    super();
    if (dependencies("hueadm")) {
      this.fetchData().catch(console.error);
      this.enabled = true;
    }
  }

  public async cli<T extends object>(subcommand: string, ...args: string[]) {
    // prettier-ignore
    const result = await bash(["hueadm", "--config", HUEADM_CONFIG_PATH, subcommand, "-j", ...args]);
    return JSON.parse(result) as T;
  }

  public rawCli(subcommand: string, ...args: string[]) {
    // prettier-ignore
    return bash(["hueadm", "--config", HUEADM_CONFIG_PATH, subcommand, ...args]);
  }

  public async fetchData() {
    const lights = await this.cli<HueLights>("lights");
    const groups = await this.cli<HueGroups>("groups");

    this._lights = Object.entries(lights).map(
      (entry) => new Light(this, ...entry),
    );

    this._groups = Object.entries(groups).map(
      (entry) => new Group(this, ...entry),
    );
  }
}

export { Group, Light };
