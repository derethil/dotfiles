import { GLib, Gio, exec, execAsync } from "astal";
import notify from "./notify";

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
    } catch (err) {
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