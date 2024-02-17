import Window from "types/widgets/window";
import Gdk from "gi://Gdk?version=3.0";
import GLib from "gi://GLib?version=2.0";

/** Generate an array of numbers */
export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

/** Check if the given commands are installed */
export function dependencies(bins: string | string[]) {
  if (!Array.isArray(bins)) bins = [bins];

  const deps = bins.map((bin) => {
    const has = Utils.exec(`which ${bin}`);
    if (!has) print(`missing dependency: ${bin}`);

    return !!has;
  });

  return deps.every((has) => has);
}

/** Creates the given widget on all monitors. */
export function forMonitors(
  widget: (monitor: number) => any
): Window<any, any>[] {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).map(widget).flat(1);
}

/** Blurs an image */
export function blurImg(img: string) {
  const cache = Utils.CACHE_DIR + "/media";
  return new Promise((resolve) => {
    if (!img) resolve("");

    const dir = cache + "/blurred";
    const blurred = dir + img.substring(cache.length);

    Utils.ensureDirectory(dir);
    Utils.execAsync(["convert", img, "-blur", "0x22", blurred])
      .then(() => resolve(blurred))
      .catch(() => resolve(""));
  });
}
