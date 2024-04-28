import { type Opt } from "lib/option";
import { options } from "options";
import { bash, dependencies, sh } from "lib/utils";
import { Wallpaper } from "services/wallpaper";

const deps = [
  "font",
  "theme",
  "bar.flatButtons",
  "bar.position",
  "bar.battery.charging",
  "bar.battery.blocks",
];

const {
  dark,
  light,
  scheme,
  padding,
  spacing,
  radius,
  border,
  accents,
  hyprland: { shadows },
} = options.theme;

type ColorOptions = Record<string, Opt<string>> | string | Opt<string>;
const t = <T extends ColorOptions>(
  dark: T,
  light: T,
) => (scheme.value === "dark" ? dark : light);
const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`;
const underToDash = (s: string) => s.replace(/_/g, "-");

// deno-fmt-ignore
const variables = () => [
  // Static Accents
  $("red", accents.red),
  $("green", accents.green),
  $("yellow", accents.yellow),
  $("blue", accents.blue),
  $("magenta", accents.magenta),
  $("teal", accents.teal),
  $("orange", accents.orange),

  ...Object.entries(t(dark, light)).map(([k, v]) => $(underToDash(k), v.value)),

  // Border
  $("border-width", `${border.width}px`),
  $("border-color", `transparentize(${t(dark.outline, light.outline)}, ${border.transparency.value / 100})`),
  $("border", "$border-width solid $border-color"),

  // Other Color Variables
  $("active-gradient", `linear-gradient(to right, ${t(dark, light).primary_container}, darken(${t(dark, light).primary_container}, 4%))`),
  $("shadow-color", t(`${t(dark, light).shadow}99`, `${t(dark, light).shadow}66`)),
  $("text-shadow", t("2pt 2pt 2pt $shadow-color", "none")),
  $("widget-transparency", `${options.theme.widget.transparency.value / 100}`),

  // Layout and Transition
  $("scheme", scheme.value),
  $("padding", `${padding.value}pt`),
  $("spacing", `${spacing.value}pt`),
  $("radius", `${radius.value}px`),
  $("transition", `${options.transition.value}ms`),

  $("shadows", `${shadows}`),

  // Fonts
  $("font-ui-size", `${options.theme.font.ui.size.value}pt`),
  $("font-ui-name", options.theme.font.ui.name.value),

  $("font-mono-size", `${options.theme.font.mono.size.value}pt`),
  $("font-mono-name", options.theme.font.mono.name.value),

  // Option Assets
  $("wallpaper", `url('${Wallpaper.wallpaper}')`),

  // System
  $("bar-position", options.bar.position.value),
  $("hyprland-gaps-multiplier", options.theme.hyprland.gaps),
];

async function resetCss() {
  if (!dependencies(["sass", "fd"])) return;

  try {
    const vars = `${TMP}/variables.scss`;
    await Utils.writeFile(variables().join("\n"), vars);

    const fd = await sh(`fd ".scss" ${App.configDir}`);
    const files = fd.split(/\s+/).map((f) => `@import '${f}';`);
    const scss = [`@import '${vars}';`, ...files].join("\n");
    const css = await bash`echo "${scss}" | sass --stdin`;
    const file = `${TMP}/style.css`;

    await Utils.writeFile(css, file);

    App.resetCss();
    App.applyCss(file);
  } catch (error) {
    logError(error);
  }
}

await sh(`fd ".scss" ${App.configDir} -t f`).then((files) => {
  files.split(/\s+/).forEach((file) => {
    Utils.monitorFile(file, resetCss);
  });
});

options.handler(deps, resetCss);
await resetCss();
