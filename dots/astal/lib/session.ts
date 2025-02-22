import { GLib } from "astal";
import { App } from "astal/gtk3";
import { bash, ensureDirectory } from "utils";

export const TEMP = `${GLib.get_tmp_dir()}/${App.get_instance_name()}`;
export const CACHE = `${GLib.get_user_cache_dir()}/${App.get_instance_name()}`;

export async function loadSessionFiles() {
  await addIcons();
  ensureDirectory(TEMP);
  ensureDirectory(CACHE);
}

export async function addIcons() {
  App.add_icons(`${SRC}/assets/icons`);
  const res = await bash(["fd", "--type", "d", ".", `${SRC}/assets/icons`]);
  const folders = res.split("\n").filter((folder) => folder);
  folders.forEach((folder) => App.add_icons(folder));
}
