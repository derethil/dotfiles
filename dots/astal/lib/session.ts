import { GLib } from "astal";
import { App } from "astal/gtk3";
import { ensureDirectory } from "utils";

export const TEMP = `${GLib.get_tmp_dir()}/${App.get_instance_name()}`;
export const CACHE = `${GLib.get_user_cache_dir()}/${App.get_instance_name()}`;

export function session() {
  ensureDirectory(TEMP);
  ensureDirectory(CACHE);
}
