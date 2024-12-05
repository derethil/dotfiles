import { GObject, property, register, Variable } from "astal";
import { bash } from "utils";

const POLL_INTERVAL = 1000;

type Megabytes = number;

interface Properties {
  total: Megabytes;
  free: Megabytes;
  used: Megabytes;
}

const get = async (properties: string) => {
  const output = await bash(`nvidia-smi --query-gpu=${properties} --format=csv,noheader,nounits`);
  return output.split(",");
};

@register({ GTypeName: "GPUMonitor" })
export class GPUMonitor extends GObject.Object {
  static instance: GPUMonitor;

  // eslint-disable-next-line camelcase
  static get_default() {
    if (!this.instance) this.instance = new GPUMonitor();
    return this.instance;
  }

  #free = 0;
  #used = 0;
  #total = 0;
  #percent = 0;

  @property(Number)
  get free() {
    return this.#free;
  }

  @property(Number)
  get used() {
    return this.#used;
  }

  @property(Number)
  get total() {
    return this.#total;
  }

  @property(Number)
  get percent() {
    return this.#percent;
  }

  constructor() {
    super();
    const poll = this.createPoll();

    poll.subscribe((properties) => {
      if (!properties) return;
      this.#total = properties.total;
      this.#free = properties.free;
      this.#used = properties.used;
      this.#percent = this.#used / this.#total;

      this.notify("total");
      this.notify("free");
      this.notify("used");
      this.notify("percent");
    });
  }

  private createPoll() {
    return Variable<Properties | null>(null).poll(POLL_INTERVAL, async () => {
      const [total, free, used] = await get("memory.total,memory.free,memory.used");
      return {
        total: Number(total),
        free: Number(free),
        used: Number(used),
      };
    });
  }
}
