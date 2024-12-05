import { GObject, property, register, Variable } from "astal";
import GTop from "gi://GTop?version=2.0";

type Memory = GTop.glibtop_mem;

const POLL_INTERVAL = 1000;

@register({ GTypeName: "MemoryMonitor" })
export class MemoryMonitor extends GObject.Object {
  static instance: MemoryMonitor;

  // eslint-disable-next-line camelcase
  static get_default() {
    if (!this.instance) this.instance = new MemoryMonitor();
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

    poll.subscribe((memory) => {
      this.#free = memory.free;
      this.#used = memory.used;
      this.#total = memory.total;
      this.#percent = memory.used / memory.total;
      this.notify("free");
      this.notify("used");
      this.notify("total");
      this.notify("percent");
    });
  }

  private createPoll() {
    return Variable<Memory>(new GTop.glibtop_mem()).poll(POLL_INTERVAL, () => {
      const memory = new GTop.glibtop_mem();
      GTop.glibtop_get_mem(memory);
      return memory;
    });
  }
}
