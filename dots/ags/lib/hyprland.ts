import { options } from "options";
import { bash } from "./utils";
const { messageAsync } = await Service.import("hyprland");

const {
  spacing,
  radius,
  border: { width },
  blur,
  hyprland: { shadows, ...hyprland },
  dark: { primary: darkActive },
  light: { primary: lightActive },
  scheme,
} = options.theme;

const deps = [
  "hyprland",
  spacing.id,
  radius.id,
  blur.id,
  width.id,
  shadows.id,
  darkActive.id,
  lightActive.id,
  scheme.id,
];

export function hyprlandOptions() {
  options.handler(deps, setupHyprland);
  setupHyprland();

  bash(`fd ".conf" ~/.config/hypr/ --follow -t f`).then((files) => {
    files.split(/\s+/).forEach((file) => {
      Utils.monitorFile(file, setupHyprland);
    });
  });
}

function activeBorder() {
  const color = scheme.value === "dark" ? darkActive.value : lightActive.value;

  return color.replace("#", "");
}

function singleTiledGaps(wmGaps: number, scaleParam?: number) {
  const { left, right } = hyprland.singleTiledGaps;
  const scale = scaleParam || 1;
  return `${wmGaps * scale} ${right.value} ${wmGaps * scale} ${left.value}`;
}

function sendBatch(batch: string[]) {
  const cmd = batch
    .filter((x) => !!x)
    .map((x) => `keyword ${x}`)
    .join("; ");

  return messageAsync(`[[BATCH]]/${cmd}`);
}

async function setupHyprland() {
  const wmGaps = Math.floor(hyprland.gaps.value * spacing.value);
  const theme = options.theme.scheme.value === "dark" ? options.theme.dark : options.theme.light;

  sendBatch([
    // Theming
    `general:border_size ${width.value}`,
    `general:gaps_out ${wmGaps}`,
    `general:gaps_in ${Math.floor(wmGaps / 2)}`,
    `general:col.active_border rgba(${activeBorder()}ff)`,
    `group:col.border_active rgba(${activeBorder()}ff)`,
    `general:col.inactive_border rgba(${hyprland.inactiveBorder.value})`,
    `group:col.border_inactive rgba(${hyprland.inactiveBorder.value})`,
    `decoration:rounding ${radius.value}`,
    `decoration:drop_shadow ${shadows.value ? "yes" : "no"}`,
    `plugin:hyprexpo:bg_color ${theme.surface.value}`,
    `plugin:hyprexpo:gap_size ${wmGaps}`,
  ]).catch(console.error);

  await sendBatch(App.windows.map(({ name }) => `layerrule unset, ${name}`));

  if (blur.value) {
    sendBatch(
      App.windows.flatMap(({ name }) => [
        `layerrule xray off, ${name}`,
        `layerrule blur, ${name}`,
        `layerrule ignorealpha ${/* based on shadow color */ 0.29}, ${name}`,
      ]),
    ).catch(console.error);
  }

  // HACK: I don't know why this timeout is needed, but gaps are not applied without it on startup
  // I assume Hyprland is not fully initialized/gets reloaded at some point after this function runs
  setTimeout(() => {
    sendBatch([`workspace w[t1] s[false], gapsout:${singleTiledGaps(wmGaps)}`]).catch(
      console.error,
    );
  }, 500);
}
