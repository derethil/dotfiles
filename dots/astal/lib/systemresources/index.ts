import { GObject, register } from "astal";
import { CPUMonitor } from "./cpu";

@register({ GTypeName: "SystemResources" })
export class SystemResources extends GObject.Object {
  static instance: SystemResources;

  // eslint-disable-next-line camelcase
  static get_default() {
    if (!this.instance) this.instance = new SystemResources();
    return this.instance;
  }

  public cpu = CPUMonitor.get_default();
}
