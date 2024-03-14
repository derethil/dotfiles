import { type Opt } from "lib/option";
import { options } from "options";
import { bash, dependencies, sh } from "lib/utils";

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
  blur,
  scheme,
  padding,
  spacing,
  radius,
  widget,
  border,
  accents,
  hyprland: { shadows },
} = options.theme;

const popoverPaddingMultiplier = 1.6;

const t = (dark: Opt<any> | string, light: Opt<any> | string) =>
  scheme.value === "dark" ? `${dark}` : `${light}`;

const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`;

const variables = () => [
  // Before
  $("red", accents.red),
  $("green", accents.green),
  $("yellow", accents.yellow),
  $("blue", accents.blue),
  $("magenta", accents.magenta),
  $("teal", accents.teal),
  $("orange", accents.orange),

  $(
    "bg",
    blur.value
      ? `transparentize(${t(dark.bg, light.bg)}, ${blur.value / 100})`
      : t(dark.bg, light.bg),
  ),
  $("fg", t(dark.fg, light.fg)),

  $("primary-bg", t(dark.primary.bg, light.primary.bg)),
  $("primary-fg", t(dark.primary.fg, light.primary.fg)),

  $("error-bg", t(dark.error.bg, light.error.bg)),
  $("error-fg", t(dark.error.fg, light.error.fg)),

  $("scheme", scheme),
  $("padding", `${padding}pt`),
  $("spacing", `${spacing}pt`),
  $("radius", `${radius}px`),
  $("transition", `${options.transition}ms`),

  $("shadows", `${shadows}`),

  $(
    "widget-bg",
    `transparentize(${t(dark.widget, light.widget)}, ${widget.transparency.value / 100})`,
  ),

  $(
    "hover-bg",
    `transparentize(${t(dark.widget, light.widget)}, ${(widget.transparency.value * 0.9) / 100})`,
  ),
  $("hover-fg", `lighten(${t(dark.fg, light.fg)}, 8%)`),

  $("border-width", `${border.width}px`),
  $(
    "border-color",
    `transparentize(${t(dark.border, light.border)}, ${border.transparency.value / 100})`,
  ),
  $("border", "$border-width solid $border-color"),

  $(
    "active-gradient",
    `linear-gradient(to right, ${t(dark.primary.bg, light.primary.bg)}, darken(${t(dark.primary.bg, light.primary.bg)}, 4%))`,
  ),
  $("shadow-color", t("rgba(0,0,0,.6)", "rgba(0,0,0,.4)")),
  $("text-shadow", t("2pt 2pt 2pt $shadow-color", "none")),

  $(
    "popover-border-color",
    `transparentize(${t(dark.border, light.border)}, ${Math.max((border.transparency.value - 1) / 100, 0)})`,
  ),
  $("popover-padding", `$padding * ${popoverPaddingMultiplier}`),
  $("popover-radius", radius.value === 0 ? "0" : "$radius + $popover-padding"),

  $("font-ui-size", `${options.font.ui.size}pt`),
  $("font-ui-name", options.font.ui.name),

  $("font-mono-size", `${options.font.mono.size}pt`),
  $("font-mono-name", options.font.mono.name),

  $("bar-position", options.bar.position),
  $("hyprland-gaps-multiplier", options.theme.hyprland.gaps),
];

const variables2 = {
  // Accents
  red: accents.red,
  green: accents.green,
  yellow: accents.yellow,
  blue: accents.blue,
  magenta: accents.magenta,
  teal: accents.teal,
  orange: accents.orange,

  // Material
  primary: t(dark.primary.bg, light.primary.bg),
};

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

export function cssMonitor() {
  Utils.monitorFile(App.configDir, resetCss);
  options.handler(deps, resetCss);
  resetCss();
}
