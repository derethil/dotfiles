import { execAsync, GLib, monitorFile } from "astal";
import { App } from "astal/gtk3";
import { bash, dependencies } from "./util";

const configPath = GLib.get_current_dir();

const findStyles = `fd --exclude "styles" ".scss" ${configPath}`;
const bundleStyles = `sass --stdin --load-path ${configPath}/styles`;

async function resetStyles() {
  const paths = await execAsync(findStyles);
  const imports = paths.split(/\s+/).map((file) => `@use "${file}";`);
  const scss = imports.join("\n");

  const css = await bash(`echo '${scss}' | ${bundleStyles}`);
  App.apply_css(css, true);
}

export async function watchStyles() {
  if (!dependencies("sass", "fd")) return;

  const paths = await execAsync(findStyles);
  paths.split(/\s+/).forEach((file) => {
    monitorFile(file, () => resetStyles());
  });

  resetStyles();
}
