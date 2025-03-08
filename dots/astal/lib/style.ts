import { execAsync, GLib, monitorFile, writeFileAsync } from "astal";
import { App } from "astal/gtk3";
import { options } from "options";
import { bash, dependencies } from "utils";
import { Option } from "./options";
import { TEMP } from "./session";

// Commands
const listStyles = `fd ".scss" --exclude "styles" ${GLib.get_current_dir()}`;
const listSharedFolders = `fd . ${GLib.get_current_dir()}/styles --type directory  `;
const listStylesInFolder = (f: string) => `fd ".scss" ${f} --maxdepth 1`;
const bundleStyles = `sass --stdin --load-path ${TEMP}`;
const deleteOldStyles = `rm -rf ${TEMP}/*.scss`;

// SCSS Generators
const use = (file: string) => `@use "${file}";`;
const forward = (file: string) => `@forward "${file}";`;
const $ = <T>(name: string, value: string | Option<T>) => {
  if (typeof value === "string") return `$${name}: ${value};`;
  return `$${name}: ${String(value.get())};`;
};

// Transform Astal Theme to SCSS
async function writeVariables() {
  const { color, font, layout } = options.theme;
  // prettier-ignore
  const theme = {
    color: [
      $("accent1", color.accent[1].default), $("accent1-muted", color.accent[1].muted),
      $("accent2", color.accent[2].default), $("accent2-muted", color.accent[2].muted),
      $("accent3", color.accent[3].default), $("accent3-muted", color.accent[3].muted),
      $("accent4", color.accent[4].default), $("accent4-muted", color.accent[4].muted),
      $("accent5", color.accent[5].default), $("accent5-muted", color.accent[5].muted),
      $("accent6", color.accent[6].default), $("accent6-muted", color.accent[6].muted),
      $("accent7", color.accent[7].default), $("accent7-muted", color.accent[7].muted),
      // Status
      $("status-error", color.status.error.default), $("status-error-muted", color.status.error.muted),
      $("status-warning", color.status.warning.default), $("status-warning-muted", color.status.warning.muted),
      $("status-critical", color.status.critical.default), $("status-critical-muted", color.status.critical.muted),
      $("status-success", color.status.success.default), $("status-success-muted", color.status.success.muted),
      // Background
      $("background-dim", color.background.dim),
      $("background-muted", color.background.muted),
      $("background", color.background.default),
      $("background-surface", color.background.surface),
      $("background-highlight", color.background.highlight),
      // Text
      $("text-muted", color.text.muted),
      $("text", color.text.default),
      $("text-highlight", color.text.highlight),
      // Border
      $("border", color.border.default),
      $("border-highlight", color.border.highlight),
    ],
    font: [
      $("sans-family", font.sans.family), $("sans-size", font.sans.size),
      $("mono-family", font.mono.family), $("mono-size", font.mono.size),
    ],
    layout: [
      $("gap", layout.gap),
      $("padding", layout.padding),
      $("radius", layout.radius),
      $("border-width", layout.borderWidth),
    ],
    misc: [
      $("transition", options.theme.transition),
    ]
  }

  const uses = Object.entries(theme).map(async ([name, values]) => {
    const path = `${TEMP}/${name}.scss`;
    await writeFileAsync(path, values.join("\n"));
    return use(path);
  });

  return Promise.all(uses);
}

async function writeStyleFolder(path: string, filename?: string): Promise<string[]> {
  const paths = (await execAsync(listStylesInFolder(path))).split(/\s+/);
  const scss = paths.map((file) => forward(file)).join("\n");
  const name = filename ?? (await bash(`basename ${path}`));
  await writeFileAsync(`${TEMP}/${name}.scss`, scss);
  return paths;
}

// Copy shared styles to temp folder
async function writeMixinImports() {
  const error = (error: unknown) =>
    console.error(`writing scss failed: ${String(error)}`);

  const folderPaths = await execAsync(listSharedFolders);
  folderPaths.split(/\s+/).forEach((path) => {
    writeStyleFolder(path).catch(error);
  });

  writeStyleFolder(`${GLib.get_current_dir()}/styles`, "mixins").catch(error);
}

// Recompile and apply styles
async function resetStyles() {
  await execAsync(deleteOldStyles);
  await writeMixinImports();

  const themePaths = await writeVariables();
  const paths = await execAsync(listStyles);
  const imports = paths.split(/\s+/).map((file) => use(file));
  const scss = [...themePaths, ...imports].join("\n");

  const css = await bash(`echo '${scss}' | ${bundleStyles}`);
  App.apply_css(css, true);
}

// Hot reload styles
export async function styles() {
  if (!dependencies("sass", "fd")) return;

  const paths = await execAsync(listStyles);
  paths.split(/\s+/).forEach((file) => {
    monitorFile(file, () => {
      resetStyles().catch((error: unknown) =>
        console.error(
          `error: reloading styles failed on saving ${file}:\n${String(error)}`,
        ),
      );
    });
  });

  resetStyles().catch((error: unknown) =>
    console.error(`error: initial styles compilation failed:\n${String(error)}`),
  );
}
