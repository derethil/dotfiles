import { GObject, property, register, Variable } from "astal";
import GTop from "gi://GTop?version=2.0";

type CPU = GTop.glibtop_cpu;

interface CPUDelta {
  prev: CPU;
  curr: CPU;
}

const POLL_INTERVAL = 1000;

function getUsage(prev: CPU, curr: CPU) {
  const totalDiff = curr.total - prev.total;
  const idleDiff = curr.idle - prev.idle;
  return (totalDiff - idleDiff) / totalDiff;
}

@register({ GTypeName: "CPUMonitor" })
export class CPUMonitor extends GObject.Object {
  static instance: CPUMonitor;

  // eslint-disable-next-line camelcase
  static get_default() {
    if (!this.instance) this.instance = new CPUMonitor();
    return this.instance;
  }

  #usage = 0;

  @property(Number)
  get usage() {
    return this.#usage;
  }

  constructor() {
    super();
    const poll = this.createPoll();
    this.monitorUsage(poll);
  }

  private createPoll() {
    return Variable<CPUDelta | null>(null).poll(POLL_INTERVAL, (previous) => {
      const cpu = new GTop.glibtop_cpu();
      GTop.glibtop_get_cpu(cpu);
      if (!previous) return { prev: cpu, curr: cpu };
      return { prev: previous.curr, curr: cpu };
    });
  }

  private monitorUsage(stats: Variable<CPUDelta | null>) {
    stats.subscribe((state) => {
      if (!state) return;
      const usage = getUsage(state.prev, state.curr);
      this.#usage = isNaN(usage) ? 0 : usage;
      this.notify("usage");
    });
  }
}
