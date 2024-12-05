import { Binding, GLib, Gio, Variable, exec, execAsync } from "astal";
import { bind, Subscribable } from "astal/binding";
import { notify } from "./notify";

export { notify };

export async function bash(strings: string | string[]) {
  const command = Array.isArray(strings) ? strings.join(" ") : strings;
  try {
    return await execAsync(["bash", "-c", command]);
  } catch (err) {
    console.error(strings, err);
    return "";
  }
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

export function toVariable<T>(value: Variable<T> | T): Variable<T> {
  return value instanceof Variable ? value : new Variable(value);
}

export function toBinding<T>(value: Binding<T> | T) {
  const subscribable = (value: T): Subscribable<T> => ({
    get: () => value,
    subscribe: () => () => value,
  });

  if (value instanceof Binding) return value;
  return bind(subscribable(value));
}
