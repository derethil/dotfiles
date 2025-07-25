import { constructOptions, Opt } from "lib/options";
import { CACHE } from "lib/session";
import { BarModule } from "widgets/Bar/modules";
import { PluginOption } from "widgets/Pulse/types";

const OPTIONS_CACHE = `${CACHE}/options.json`;

export const options = constructOptions(OPTIONS_CACHE, {
  // General Options
  theme: {
    transition: Opt(200),
    transparency: Opt(0.4),
    layout: {
      gap: Opt(9),
      padding: Opt(10),
      radius: Opt(12),
      borderWidth: Opt(2),
    },
    font: {
      sans: { family: Opt("SF Pro Display"), size: Opt(13) },
      mono: { family: Opt("Liga SFMono Nerd Font"), size: Opt(13) },
    },
    color: {
      accent: {
        1: { muted: Opt("#C14A4A"), default: Opt("#EA6962") },
        2: { muted: Opt("#C76E2D"), default: Opt("#E78A4E") },
        3: { muted: Opt("#BA832C"), default: Opt("#D8A657") },
        4: { muted: Opt("#7E8E50"), default: Opt("#A9B665") },
        5: { muted: Opt("#5f7e5b"), default: Opt("#89B482") },
        6: { muted: Opt("#5C7E81"), default: Opt("#7DAEA3") },
        7: { muted: Opt("#945e77"), default: Opt("#D3869B") },
      },
      status: {
        error: { muted: Opt("#C14A4A"), default: Opt("#EA6962") },
        warning: { muted: Opt("#B07C3D"), default: Opt("#D8A657") },
        critical: { muted: Opt("#C76E2D"), default: Opt("#E78A4E") },
        success: { muted: Opt("#7E8E50"), default: Opt("#A9B665") },
      },
      background: {
        dim: Opt("#141617"),
        muted: Opt("#1D2021"),
        default: Opt("#282828"),
        surface: Opt("#3C3836"),
        highlight: Opt("#504945"),
      },
      text: {
        muted: Opt("#928374"),
        default: Opt("#D4BE98"),
        highlight: Opt("#DDC7A1"),
      },
      border: {
        default: Opt("#3C3836"),
        highlight: Opt("#504945"),
      },
    },
  },
  // Widget Options
  corners: {
    radius: Opt(16),
    color: Opt("#000000"),
  },
  dock: {
    pinned: Opt<string[]>([
      "footclient",
      "firefox",
      "chromium",
      "discord",
      "mattermost",
      "insomnia",
      "obsidian",
      "notion",
      "spotify",
      "steam",
      "stremio",
    ]),
    size: Opt(36),
  },
  bar: {
    position: Opt<"LEFT" | "RIGHT">("LEFT"),
    modules: {
      start: Opt<BarModule[]>([
        "DashboardButton",
        "Separator",
        // "SystemMonitor",
        "Separator",
        "Tray",
      ]),
      center: Opt<BarModule[]>(["Workspaces"]),
      end: Opt<BarModule[]>([
        "Media",
        "Weather",
        "Volume",
        "Separator",
        "Tools",
        "Separator",
        "DateTime",
      ]),
    },
    workspaces: {
      dynamic: Opt(false),
      count: Opt(5),
    },
    tray: {
      hidden: Opt<string[]>(["Wayland to X11 Video bridge"]),
    },
    weather: {
      units: Opt<"standard" | "metric" | "imperial">("imperial"),
    },
    tools: {
      colorPicker: Opt<string>("hyprpicker -a"),
    },
    updates: {
      minPackages: Opt(100),
    },
  },
  pulse: {
    plugins: Opt<PluginOption[]>([
      { plugin: "Applications", command: ":a" },
      { plugin: "Games", command: ":g" },
      { plugin: "Calculate", command: ":cal" },
      { plugin: "PowerMenu", command: ":p" },
      { plugin: "HueControl", command: ":h" },
      { plugin: "Shell", command: ":e" },
      { plugin: "Sunset", command: ":s" },
      { plugin: "Clipboard", command: ":c" },
    ]),
  },
  libs: {
    steam: {
      appsPath: Opt("~/.local/share/Steam/steamapps"),
    },
  },
});
