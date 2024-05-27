import { dependencies, sh } from "lib/utils";

export type Resolution = 1920 | 1366 | 3840;
export type Market =
  | "random"
  | "en-US"
  | "ja-JP"
  | "en-AU"
  | "en-GB"
  | "de-DE"
  | "en-NZ"
  | "en-CA";

const currentWallpaperPath = `${Utils.HOME}/Pictures/wallpapers/current`;
const Cache = `${Utils.HOME}/Pictures/wallpaperCache/Bing`;

class WallpaperService extends Service {
  static {
    Service.register(this, {}, {
      "wallpaper": ["string"],
    });
  }

  #blockMonitor = false;

  private setWallpaperSwww() {
    if (!dependencies("swww")) {
      return;
    }

    sh("hyprctl cursorpos").then((pos) => {
      sh([
        "swww",
        "img",
        "--transition-type",
        "grow",
        "--transition-pos",
        pos.replace(" ", ""),
        currentWallpaperPath,
      ]).then(() => {
        this.changed("wallpaper");
      });
    });
  }

  private async setWallpaper(path: string) {
    this.#blockMonitor = true;

    await sh(`cp ${path} ${currentWallpaperPath}`);
    this.setWallpaperSwww();

    this.#blockMonitor = false;
  }

  async #fetchBing() {
    const res = await Utils.fetch("https://bing.biturl.top/", {
      params: {
        resolution: options.wallpaperOpts.resolution.value,
        format: "json",
        image_format: "jpg",
        index: "random",
        mkt: options.wallpaperOpts.market.value,
      },
    }).then((res) => res.text());

    if (!res.startsWith("{")) {
      return console.warn("bing api", res);
    }

    const { url } = JSON.parse(res);
    const file = `${Cache}/${url.replace("https://www.bing.com/th?id=", "")}`;

    if (dependencies("curl")) {
      Utils.ensureDirectory(Cache);
      await sh(`curl "${url}" --output ${file}`);
      this.setWallpaper(file);
    }
  }

  readonly random = () => {
    this.#fetchBing();
  };

  readonly set = (path: string) => {
    this.setWallpaper(path);
  };

  get wallpaper() {
    return currentWallpaperPath;
  }

  constructor() {
    super();

    if (!dependencies("swww")) {
      return this;
    }

    // gtk portal
    Utils.monitorFile(currentWallpaperPath, () => {
      if (!this.#blockMonitor) {
        this.setWallpaperSwww();
      }
    });

    Utils.execAsync("swww-daemon")
      .then(this.setWallpaperSwww)
      .catch(() => null);
  }
}

export const Wallpaper = new WallpaperService();
