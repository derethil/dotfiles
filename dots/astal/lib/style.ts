import { execAsync, GLib, monitorFile, writeFileAsync } from "astal";
import { App } from "astal/gtk3";
import { options } from "options";
import { Option } from "./options";
import { TEMP } from "./session";
import { bash, dependencies } from "./util";

const findWidgetStyles = `fd ".scss" --exclude "styles" ${GLib.get_current_dir()}`;
const findSharedStyles = `fd ".scss" ${GLib.get_current_dir()}/styles`;
const copySharedStyles = `${findSharedStyles} --exec cp {} ${TEMP}`;
const bundleStyles = `sass --stdin --load-path ${TEMP}`;
const deleteOldStyles = `rm -rf ${TEMP}/*.scss`;

const use = (file: string) => `@use "${file}";`;
const forward = (file: string) => `@forward "${file}";`;
const $ = <T>(name: string, value: string | Option<T>) => {
  if (typeof value === "string") return `$${name}: ${value};`;
  return `$${name}: ${value.get()};`;
};

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
    ]
  }

  const uses = Object.entries(theme).map(async ([name, values]) => {
    const path = `${TEMP}/${name}.scss`;
    await writeFileAsync(path, values.join("\n"));
    return use(path);
  });

  return Promise.all(uses);
}

async function writeSharedStyles() {
  const paths = await execAsync(findSharedStyles);
  const imports = paths.split(/\s+/).map((file) => forward(file));
  const scss = imports.join("\n");
  await writeFileAsync(`${TEMP}/mixins.scss`, scss);
  await execAsync(copySharedStyles);
}

async function resetStyles() {
  await execAsync(deleteOldStyles);
  await writeSharedStyles();

  const themePaths = await writeVariables();
  const paths = await execAsync(findWidgetStyles);
  const imports = paths.split(/\s+/).map((file) => use(file));
  const scss = [...themePaths, ...imports].join("\n");

  const css = await bash(`echo '${scss}' | ${bundleStyles}`);
  App.apply_css(css, true);
}

export async function watchStyles() {
  if (!dependencies("sass", "fd")) return;

  const paths = await execAsync(findWidgetStyles);
  paths.split(/\s+/).forEach((file) => {
    monitorFile(file, () => resetStyles());
  });

  resetStyles();
}
