import { bash, dependencies, sh } from "lib/utils";

if (!dependencies("brightnessctl")) App.quit();

const get = (args: string) => Number(Utils.exec(`brightnessctl ${args}`));
const screen = await bash`ls -w1 /sys/class/backlight | head -1`;

class BrightnessService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        screen: ["float", "rw"],
      },
    );
  }

  #screenMax = get("max");
  #screen = get("get") / get("max");

  get screen() {
    return this.#screen;
  }

  set screen(percent) {
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    console.log(percent);

    sh(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
      this.#screen = percent;
      this.changed("screen");
    });
  }

  constructor() {
    super();

    const screenPath = `/sys/class/backlight/${screen}/brightness`;

    Utils.monitorFile(screenPath, async () => {
      const value = await Utils.readFileAsync(screenPath);
      console.log(value);
      this.#screen = Number(value) / this.#screenMax;
      this.changed("screen");
    });
  }
}

declare global {
  const brightness: BrightnessService;
}

export const Brightness = new BrightnessService();

Object.assign(globalThis, {
  brightness: Brightness,
});
