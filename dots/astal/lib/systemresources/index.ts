import { GObject, register } from "astal";
import { CPUMonitor } from "./cpu";
import { GPUMonitor } from "./gpu";
import { MemoryMonitor } from "./memory";

@register({ GTypeName: "SystemResources" })
export class SystemResources extends GObject.Object {
  static instance: SystemResources;

  static get_default() {
    if (!this.instance) this.instance = new SystemResources();
    return this.instance;
  }

  public cpu = CPUMonitor.get_default();
  public memory = MemoryMonitor.get_default();
  public gpu = GPUMonitor.get_default();
}
