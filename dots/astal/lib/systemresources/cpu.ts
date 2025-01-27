import { GObject, property, register, Variable } from "astal";
import GTop from "gi://GTop?version=2.0";
import { ParentGObject } from "types/gir";

type CPU = GTop.glibtop_cpu;

interface CPUDelta {
  prev: CPU;
  curr: CPU;
}

const POLL_INTERVAL = 300;

function getUsage(prev: CPU, curr: CPU) {
  const totalDiff = curr.total - prev.total;
  const idleDiff = curr.idle - prev.idle;
  return (totalDiff - idleDiff) / totalDiff;
}

@register({ GTypeName: "CPUMonitor" })
export class CPUMonitor extends GObject.Object {
  @property(Number)
  declare usage: number;
  static instance: CPUMonitor;
  static parent: ParentGObject;

  static get_default(parent?: ParentGObject) {
    if (!this.instance) this.instance = new CPUMonitor();
    if (!this.parent && parent) this.parent = parent;
    return this.instance;
  }

  constructor() {
    super();
    this.poll().subscribe((state) => {
      if (!state) return;
      const usage = getUsage(state.prev, state.curr);
      this.usage = isNaN(usage) ? 0 : usage;
      CPUMonitor.parent?.object.notify(CPUMonitor.parent.prop);
    });
  }

  private poll() {
    return Variable<CPUDelta | null>(null).poll(POLL_INTERVAL, (previous) => {
      const cpu = new GTop.glibtop_cpu();
      GTop.glibtop_get_cpu(cpu);
      if (!previous) return { prev: cpu, curr: cpu };
      return { prev: previous.curr, curr: cpu };
    });
  }
}
