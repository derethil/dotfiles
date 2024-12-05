import { GObject, property, register, Variable } from "astal";
import { bash } from "utils";

interface CPUStats {
  user: number;
  nice: number;
  system: number;
  idle: number;
  iowait: number;
  irq: number;
  softirq: number;
  steal: number;
  guest: number;
  guestNice: number;
}

interface CPUOverTime {
  prev: CPUStats;
  curr: CPUStats;
}

const POLL_INTERVAL = 1000;

function parse(line: string): CPUStats {
  const [, user, nice, system, idle, iowait, irq, softirq, steal, guest, guestNice] = line
    .split(" ")
    .map(Number)
    .filter((n) => !isNaN(n));

  return { user, nice, system, idle, iowait, irq, softirq, steal, guest, guestNice };
}

async function getCPUStats(): Promise<CPUStats> {
  const data = (await bash("cat /proc/stat | grep '^cpu '")).split("\n")[0];
  const stats = parse(data);
  return stats;
}

function calculateUsage(prev: CPUStats, curr: CPUStats) {
  const prevIdle = prev.idle + prev.iowait;
  const currIdle = curr.idle + curr.iowait;

  const prevTotal = (Object.values(prev) as number[]).reduce((acc, val) => acc + val, 0);
  const currTotal = (Object.values(curr) as number[]).reduce((acc, val) => acc + val, 0);

  const totalDiff = currTotal - prevTotal;
  const idleDiff = currIdle - prevIdle;
  return (totalDiff - idleDiff) / totalDiff;
}

@register({ GTypeName: "CPUStats" })
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
    return Variable<CPUOverTime | null>(null).poll(POLL_INTERVAL, async (previous) => {
      const newStats = await getCPUStats();
      if (!previous) return { prev: newStats, curr: newStats };
      return { prev: previous.curr, curr: newStats };
    });
  }

  private monitorUsage(stats: Variable<CPUOverTime | null>) {
    stats.subscribe((state) => {
      if (!state) return;
      const usage = calculateUsage(state.prev, state.curr);
      this.#usage = isNaN(usage) ? 0 : usage;
      this.notify("usage");
    });
  }
}
