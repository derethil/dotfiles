import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import Gdk from "gi://Gdk";

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
