import { GLib } from "astal";
import { App } from "astal/gtk3";
import { ensureDirectory } from "utils";

export const TEMP = `${GLib.get_tmp_dir()}/${App.get_instance_name()}`;
export const OPTIONS_CACHE = `${GLib.get_user_cache_dir()}/${App.get_instance_name()}/options.json`;

export function session() {
  ensureDirectory(TEMP);
  ensureDirectory(OPTIONS_CACHE.split("/").slice(0, -1).join("/"));
}
