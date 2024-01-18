import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import options from "../options.js";
import {
  readFile,
  writeFile,
  subprocess,
} from "resource:///com/github/Aylur/ags/utils.js";

/** @param {Array<string>} batch */
function sendBatch(batch) {
  const cmd = batch
    .filter((x) => !!x)
    .map((x) => `keyword ${x}`)
    .join("; ");

  Hyprland.sendMessage(`[[BATCH]]/${cmd}`);
}

/** @param {string} scss */
function getColor(scss) {
  if (scss.includes("#")) return scss.replace("#", "");

  if (scss.includes("$")) {
    const opt = options
      .list()
      .find((opt) => opt.scss === scss.replace("$", ""));
    return opt?.value.replace("#", "") || "ff0000";
  }
}

export function hyprlandInit() {
  if (readFile("/tmp/ags/hyprland-init")) return;

  //  sendBatch(
  //    Array.from(App.windows).flatMap(([name]) => [`layerrule blur, ${name}`])
  //  );

  writeFile("init", "/tmp/ags/hyprland-init");
}

export async function setupHyprland() {
  const wm_gaps = Math.floor(
    options.hypr.wm_gaps_multiplier.value * options.spacing.value
  );
  const border_width = options.border.width.value;
  const radii = options.radii.value;
  const drop_shadow = options.desktop.drop_shadow.value;
  const bar_pos = options.bar.position.value;
  const inactive_border = options.hypr.inactive_border.value;
  const accent = getColor(options.theme.accent.accent.value);

  const batch = [];

  JSON.parse(await Hyprland.sendMessage("j/monitors")).forEach(({ name }) => {
    const v = bar_pos === "left" ? `0,0,-${wm_gaps},0` : `0,0,0,-${wm_gaps}`;
    batch.push(`monitor ${name},addreserved,${v}`);
  });

  batch.push(
    `general:border_size ${border_width}`,
    `general:gaps_out ${wm_gaps}`,
    `general:gaps_in ${Math.floor(wm_gaps / 2)}`,
    `general:col.active_border rgba(${accent}ff)`,
    `general:col.inactive_border ${inactive_border}`,
    `decoration:rounding ${radii}`,
    `decoration:drop_shadow ${drop_shadow ? "yes" : "no"}`
  );

  sendBatch(batch);
}

export function centerWindowsInit() {
  options.hypr.single_window_width.connect("changed", centerSingleWindows);
}

export async function centerSingleWindows() {
  const script_name = "center_single_windows";
  const script_path = `~/.config/hypr/scripts/${script_name}`;

  const window_width = options.hypr.single_window_width.value;

  if (window_width === 0) return;

  // TODO: Support multiple monitors
  const monitor = JSON.parse(await Hyprland.sendMessage("j/monitors"))[0];
  const wm_gaps = options.hypr.wm_gaps_multiplier.value * options.spacing.value;
  const border_width = options.border.width.value;
  const window_height =
    monitor.height - Math.floor(wm_gaps) * 2 - border_width * 2;

  subprocess(
    ["bash", "-c", `${script_path} ${window_width} ${window_height}`],
    () => {},
    (sterr) => console.error(sterr)
  );
}
