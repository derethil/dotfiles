import { GObject, property, register, Variable } from "astal";
import { ParentGObject } from "types/gir";
import { bash, dependencies } from "utils";

const POLL_INTERVAL = 1000;

interface Properties {
  total: Megabytes;
  free: Megabytes;
  used: Megabytes;
}

const get = async (properties: string) => {
  const output = await bash(
    `nvidia-smi --query-gpu=${properties} --format=csv,noheader,nounits`,
  );
  return output.split(",");
};

@register({ GTypeName: "GPUMonitor" })
export class GPUMonitor extends GObject.Object {
  @property(Boolean)
  declare enabled: boolean;

  @property(Number)
  declare free: number;

  @property(Number)
  declare used: number;

  @property(Number)
  declare total: number;

  @property(Number)
  declare percent: number;

  static instance: GPUMonitor;
  static parent: ParentGObject;

  static get_default(parent?: ParentGObject) {
    if (!this.instance) this.instance = new GPUMonitor();
    if (!this.parent && parent) this.parent = parent;
    return this.instance;
  }

  constructor() {
    super();

    if (!dependencies("nvidia-smi")) return;

    this.enabled = true;
    const poll = this.createPoll();

    poll.subscribe((properties) => {
      if (!properties) return;
      this.total = properties.total;
      this.free = properties.free;
      this.used = properties.used;
      this.percent = this.used / this.total;
      GPUMonitor.parent?.object.notify(GPUMonitor.parent.prop);
    });
  }

  private createPoll() {
    return Variable<Properties | null>(null).poll(POLL_INTERVAL, async () => {
      const [total, free, used] = await get(
        "memory.total,memory.free,memory.used",
      );
      return {
        total: Number(total),
        free: Number(free),
        used: Number(used),
      };
    });
  }
}
