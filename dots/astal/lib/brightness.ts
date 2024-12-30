import { monitorFile, readFileAsync } from "astal/file";
import GObject, { register, property } from "astal/gobject";
import { exec, execAsync } from "astal/process";

const get = (args: string) => Number(exec(`brightnessctl ${args}`));
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);
const kbd = exec(`bash -c "ls -w1 /sys/class/leds | head -1"`);

@register({ GTypeName: "Brightness" })
export class Brightness extends GObject.Object {
  static instance: Brightness;

  static get_default() {
    if (!this.instance) this.instance = new Brightness();
    return this.instance;
  }

  #kbdMax = get(`--device ${kbd} max`);
  #kbd = get(`--device ${kbd} get`);
  #screenMax = get("max");
  #screen = get("get") / (get("max") || 1);

  @property(Number)
  get kbd() {
    return this.#kbd;
  }

  set kbd(value) {
    if (value < 0 || value > this.#kbdMax) return;

    execAsync(`brightnessctl -d ${kbd} s ${value} -q`)
      .then(() => {
        this.#kbd = value;
        this.notify("kbd");
      })
      .catch((error: unknown) => console.error(error));
  }

  @property(Number)
  get screen() {
    return this.#screen;
  }

  set screen(percent) {
    if (percent < 0) percent = 0;

    if (percent > 1) percent = 1;

    execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`)
      .then(() => {
        this.#screen = percent;
        this.notify("screen");
      })
      .catch((error: unknown) => console.error(error));
  }

  constructor() {
    super();

    const screenPath = `/sys/class/backlight/${screen}/brightness`;
    const kbdPath = `/sys/class/leds/${kbd}/brightness`;

    monitorFile(screenPath, (f) => {
      readFileAsync(f)
        .then((v) => {
          this.#screen = Number(v) / this.#screenMax;
          this.notify("screen");
        })
        .catch((error: unknown) => console.error(error));
    });

    monitorFile(kbdPath, (f) => {
      readFileAsync(f)
        .then((v) => {
          this.#kbd = Number(v) / this.#kbdMax;
          this.notify("kbd");
        })
        .catch((error: unknown) => console.error(error));
    });
  }
}
