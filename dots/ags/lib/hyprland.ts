import { options } from "options";
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
}

function activeBorder() {
  const color = scheme.value === "dark" ? darkActive.value : lightActive.value;

  return color.replace("#", "");
}

function singleTiledGaps(wmGaps: number) {
  const {
    left = wmGaps,
    right = wmGaps,
    top = wmGaps,
    bottom = wmGaps,
  } = hyprland.singleTiledGaps.value;
  return `${top} ${right} ${bottom} ${left}`;
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

  sendBatch([
    `general:border_size ${width.value}`,
    `general:gaps_out ${wmGaps}`,
    `general:gaps_in ${Math.floor(wmGaps / 2)}`,
    `general:col.active_border rgba(${activeBorder()}ff)`,
    `general:col.inactive_border rgba(${hyprland.inactiveBorder.value})`,
    `decoration:rounding ${radius.value}`,
    `decoration:drop_shadow ${shadows.value ? "yes" : "no"}`,
    `workspace w[t1], gapsout:${singleTiledGaps(wmGaps)}`,
  ]);

  await sendBatch(App.windows.map(({ name }) => `layerrule unset, ${name}`));

  if (blur.value > 0) {
    sendBatch(
      App.windows.flatMap(({ name }) => [
        `layerrule unset, ${name}`,
        `layerrule blur, ${name}`,
        `layerrule ignorealpha ${/* based on shadow color */ 0.29}, ${name}`,
      ]),
    );
  }
}
