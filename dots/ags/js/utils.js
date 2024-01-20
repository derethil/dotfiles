import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import Gdk from "gi://Gdk";
import GLib from "gi://GLib";
import cairo from "cairo";

/**
 * Generate an array of numbers.
 * @param {number} length
 * @param {number=} start
 * @returns {Array<number>}
 */
export function range(length, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

/**
 * Substitutes an item in a collection of strings.
 * @param {Array<[string, string] | string[]>} collection
 * @param {string} item
 * @returns {string}
 */
export function substitute(collection, item) {
  return collection.find(([from]) => from === item)?.[1] || item;
}

/**
 * Passes the default monitor number to the widget function.
 * @param {(monitor: number) => any} widget
 * @returns {Array<import('types/widgets/window').default>}
 */
export function forMonitors(widget) {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).map(widget).flat(1);
}

/**
 * Ensures that all dependencies are installed.
 * @param {Array<string>} bins */
export function dependencies(bins) {
  const deps = bins.map((bin) => {
    const has = Utils.exec(`which ${bin}`);
    if (!has) print(`missing dependency: ${bin}`);

    return !!has;
  });

  return deps.every((has) => has);
}

/**
 * Creates a cairo surface from a widget.
 * @param {import('gi://Gtk').Gtk.Widget} widget
 * @returns {any} - missing cairo type
 */
export function createSurfaceFromWidget(widget) {
  const alloc = widget.get_allocation();
  const surface = new cairo.ImageSurface(
    cairo.Format.ARGB32,
    alloc.width,
    alloc.height
  );
  const cr = new cairo.Context(surface);
  cr.setSourceRGBA(255, 255, 255, 0);
  cr.rectangle(0, 0, alloc.width, alloc.height);
  cr.fill();
  widget.draw(cr);

  return surface;
}

/**
 * Returns the .env file as an object.
 * @returns {Record<string, string>}
 * */
function dotenv() {
  const HOME = GLib.getenv("HOME");
  const contents = Utils.readFile(`${HOME}/.config/ags/.env`);

  if (contents === "") {
    console.error("no .env file found");
  }

  const lines = contents.split("\n");

  const env = lines.reduce((acc, line) => {
    const [key, value] = line.split("=");
    acc[key] = value;
    return acc;
  }, {});

  return env;
}

/**
 * Returns the value of a key in the .env file.
 * @param {string} key
 * @returns {string}
 */
export function env(key) {
  const env = dotenv();
  return env[key];
}

/** @param {string} img - path to an img file */
export function blurImg(img) {
  const cache = Utils.CACHE_DIR + "/media";
  return new Promise((resolve) => {
    if (!img) resolve("");

    const dir = cache + "/blurred";
    const blurred = dir + img.substring(cache.length);

    if (GLib.file_test(blurred, GLib.FileTest.EXISTS)) return resolve(blurred);

    Utils.ensureDirectory(dir);
    Utils.execAsync(["convert", img, "-blur", "0x22", blurred])
      .then(() => resolve(blurred))
      .catch(() => resolve(""));
  });
}
