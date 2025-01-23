import { GLib, GObject, property, register } from "astal";
import { bash } from "utils";

const HUEADM_CONFIG_PATH = `${GLib.get_user_config_dir()}/.hueadm.json`;

@register({ GTypeName: "Hue" })
export class Hue extends GObject.Object {
  private static instance: Hue;
  private _groups: HueGroup[] = [];
  private _lights: HueLight[] = [];

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

  public async huectl<T extends object>(subcommand: string, ...args: string[]) {
    // prettier-ignore
    const result = await bash(["hueadm", "--config", HUEADM_CONFIG_PATH, subcommand, "-j", ...args]);
    return JSON.parse(result) as T;
  }

  constructor() {
    super();
    this.loadData().catch(console.error);
  }

  private async loadData() {
    this._groups = Object.values(await this.huectl<HueGroups>("groups"));
    this._lights = Object.values(await this.huectl<HueLights>("lights"));
  }
}
