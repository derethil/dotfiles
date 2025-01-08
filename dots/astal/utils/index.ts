import { GLib, Gio, exec, execAsync } from "astal";
import { Astal } from "astal/gtk3";
import { notify } from "./notify";
import { toBinding, toVariable } from "./state";

export { notify, toBinding, toVariable };

export async function bash(strings: string | string[]) {
  const command = Array.isArray(strings) ? strings.join(" ") : strings;
  try {
    return await execAsync(["bash", "-c", command]);
  } catch (err) {
    console.error(strings, err);
    return "";
  }
}

export function testDependencies(...bins: string[]): boolean {
  const missing = bins.filter((bin) => {
    try {
      exec(`which ${bin}`);
      return false;
    } catch {
      return true;
    }
  });

  return missing.length === 0;
}

export function dependencies(...bins: string[]): boolean {
  const missing = bins.filter((bin) => {
    try {
      exec(`which ${bin}`);
      return false;
    } catch {
      return true;
    }
  });

  if (missing.length > 0) {
    notify("Missing dependencies", {
      body: missing.join(", "),
      urgency: "critical",
    });
    return false;
  }

  return true;
}

export function ensureDirectory(path: string) {
  if (GLib.file_test(path, GLib.FileTest.EXISTS)) return;
  Gio.File.new_for_path(path).make_directory_with_parents(null);
}

export function sleep(ms = 0) {
  return new Promise((res) => setTimeout(res, ms));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function launchInTerminal(command: string) {
  const launchfoot = `${GLib.get_user_config_dir()}/hypr/scripts/launchfoot`;
  bash(`${launchfoot} "${command}"`).catch(console.error);
}

export function icon(icon: string, fallback: string) {
  if (Astal.Icon.lookup_icon(icon)) return icon;
  return fallback;
}
