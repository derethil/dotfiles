import { Binding, GLib, Gio, exec, execAsync, readFile } from "astal";
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

export function readFileIfExists(path: string) {
  if (!GLib.file_test(path, GLib.FileTest.EXISTS)) return undefined;
  return readFile(path);
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
  if (icon && Astal.Icon.lookup_icon(icon)) return icon;
  return fallback;
}

export function addLineNumbers(message: string) {
  const lines = message.split("\n");
  const numbered = lines
    .map((line, i) => {
      const padded = String(i + 1).padStart(3, "0");
      return `${padded} | ${line}`;
    })
    .join("\n");

  return `\n${numbered}`;
}

export function debounce<T>(fn: (...args: T[]) => void, delay: number) {
  let timeout: GLib.Source;
  return (...args: T[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export function watch<T>(bind: Binding<T>, transform?: (value: T) => unknown) {
  console.log(transform?.(bind.get()) ?? bind.get());
  return bind.subscribe(() => console.log(transform?.(bind.get()) ?? bind.get()));
}

export function attach<T>(bind: Binding<T>, callback: (value: T) => unknown) {
  callback(bind.get());
  return bind.subscribe(callback);
}
