import GLib from "gi://GLib?version=2.0";
import Gdk from "gi://Gdk?version=3.0";
import Gtk from "gi://Gtk?version=3.0";
import { substitutes } from "lib/icons";

/** Generate an array of numbers */
export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

/** Check if the given commands are installed */
export function dependencies(...bins: string[]): boolean {
  const missing = bins.filter((bin) =>
    Utils.exec({
      cmd: `which ${bin}`,
      out: () => false,
      err: () => true,
    })
  );

  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(", ")}`));
    Utils.notify(`missing dependencies: ${missing.join(", ")}`);
  }

  return missing.length === 0;
}

/** Waits given ms to execute callback */
export function wait<T>(ms: number, callback: () => T): Promise<T> {
  return new Promise((resolve) =>
    Utils.timeout(ms, () => {
      resolve(callback());
    })
  );
}

/** Executes bash command(s) */
export async function bash(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd = typeof strings === "string"
    ? strings
    : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");

  return Utils.execAsync(["bash", "-c", cmd]).catch((err) => {
    console.error(cmd, err);
    return "";
  });
}

/** Executes shell command(s) */
export async function sh(cmd: string | string[]) {
  return Utils.execAsync(cmd).catch((err) => {
    console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err);
    return "";
  });
}

/** Creates the given widget on all monitors. */
export function forMonitors(widget: (monitor: number) => Gtk.Window) {
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
/** Get substitute icon || name || fallback icon */
export function icon(name: string | null, fallback = name): string {
  if (!name) return fallback || "";

  if (GLib.file_test(name, GLib.FileTest.EXISTS)) return name;

  const icon = substitutes[name] || name;
  if (Utils.lookUpIcon(icon)) return icon;

  print(`no icon substitute "${icon}" for "${name}", fallback: "${fallback}"`);
  return fallback!;
}

/** Convert to title case */
export function toTitleCase(input: string): string {
  if (!input) return "";

  return input
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function createSurfaceFromWidget(widget: Gtk.Widget) {
  const cairo = imports.gi.cairo as any;
  const alloc = widget.get_allocation();
  const surface = new cairo.ImageSurface(
    cairo.Format.ARGB32,
    alloc.width,
    alloc.height,
  );
  const cr = new cairo.Context(surface);
  cr.setSourceRGBA(255, 255, 255, 0);
  cr.rectangle(0, 0, alloc.width, alloc.height);
  cr.fill();
  widget.draw(cr);
  return surface;
}

export function playNotificationBell() {
  const path = `${App.configDir}/assets/notification.wav`;
  bash(`pw-cat --playback ${path} --media-role notification`);
}

export async function getGdkMonitor(hyprlandId: number) {
  const Hyprland = await Service.import("hyprland");
  const monitor = Hyprland.getMonitor(hyprlandId);

  if (!monitor) return;

  return Gdk.Display.get_default()?.get_monitor_at_point(monitor.x, monitor.y);
}

export async function isGdkMonitorActive(gdkMonitorId: number) {
  const Hyprland = await Service.import("hyprland");
  const activeWorkspace = Hyprland.getWorkspace(Hyprland.active.workspace.id);

  if (!activeWorkspace) return false;

  const activeMonitor = await getGdkMonitor(activeWorkspace.monitorID);
  const compareToMonitor = Gdk.Display.get_default()?.get_monitor(gdkMonitorId);

  if (!activeMonitor || !compareToMonitor) return false;

  const activeWidth = activeMonitor.workarea.width;
  const unionedWidth =
    activeMonitor.workarea.union(compareToMonitor.workarea).width;

  return activeWidth === unionedWidth;
}
