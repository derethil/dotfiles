import GLib from "gi://GLib?version=2.0";
import { dependencies, sh } from "./utils";

declare global {
  const OPTIONS: string;
  const TMP: string;
}

Object.assign(globalThis, {
  OPTIONS: `${GLib.get_user_cache_dir()}/ags/options.json`,
  TMP: `${GLib.get_tmp_dir()}/ags`,
});

Utils.ensureDirectory(TMP);

async function addIcons() {
  if (!dependencies("fd")) return;

  const fd = sh(`fd -t d . ${App.configDir}/assets/icons`);
  const directories = (await fd).split("\n");

  App.addIcons(`${App.configDir}/assets/icons`);
  directories.forEach((dir) => App.addIcons(dir));
}

addIcons();
