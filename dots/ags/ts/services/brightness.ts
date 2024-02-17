class BrightnessService extends Service {
  static {
    Service.register(
      this,
      {
        "screen-changed": ["float"],
      },
      {
        backlit: ["float", "rw"],
      }
    );
  }

  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");
  #screenValue = 0;
  #max = Number(Utils.exec("brightnessctl max"));

  get backlit() {
    return this.#screenValue;
  }

  set backlit(percent) {
    if (percent < 0) percent = 0;

    if (percent > 1) percent = 1;

    Utils.execAsync(`brightnessctl set ${percent * 100}% -q`);
  }

  constructor() {
    super();
    const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());
    this.#onChange();
  }

  #onChange() {
    this.#screenValue = Number(Utils.exec("brightnessctl get")) / this.#max;
    this.changed("backlit");
    this.emit("screen-changed", this.#screenValue);
  }

  connect(
    event = "screen-changed",
    callback: (this: this, ...args: any[]) => void
  ) {
    return super.connect(event, callback);
  }
}

const service = new BrightnessService();
globalThis["brightness"] = service;
export default service;
