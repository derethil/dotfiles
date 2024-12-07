import { GObject, property, register, Variable } from "astal";
import GTop from "gi://GTop?version=2.0";
import { ParentGObject } from "types/gir";

const POLL_INTERVAL = 1000;

@register({ GTypeName: "MemoryMonitor" })
export class MemoryMonitor extends GObject.Object {
  @property(Number)
  declare free: number;

  @property(Number)
  declare used: number;

  @property(Number)
  declare total: number;

  @property(Number)
  declare percent: number;

  static parent: ParentGObject;
  static instance: MemoryMonitor;

  // eslint-disable-next-line camelcase
  static get_default(parent?: ParentGObject) {
    if (!this.instance) this.instance = new MemoryMonitor();
    if (!this.parent && parent) this.parent = parent;
    return this.instance;
  }

  constructor() {
    super();
    const poll = this.createPoll();

    poll.subscribe((memory) => {
      this.free = memory.free + memory.buffer + memory.cached;
      this.used = memory.used;
      this.total = memory.total;
      this.percent = (this.total - this.free) / this.total;
      MemoryMonitor.parent?.object.notify(MemoryMonitor.parent.prop);
    });
  }

  private createPoll() {
    return Variable<GTop.glibtop_mem>(new GTop.glibtop_mem()).poll(POLL_INTERVAL, () => {
      const memory = new GTop.glibtop_mem();
      GTop.glibtop_get_mem(memory);
      return memory;
    });
  }
}
