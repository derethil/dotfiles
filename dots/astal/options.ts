import { constructOptions, Opt } from "lib/options";
import { OPTIONS_CACHE } from "lib/session";
import { BarModule } from "widgets/Bar";

export const options = constructOptions(OPTIONS_CACHE, {
  // General Options
  theme: {
    transition: Opt(200),
    layout: {
      gap: Opt(9),
      padding: Opt(10),
      radius: Opt(12),
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
    radius: Opt(20),
    color: Opt("#000000"),
  },
  bar: {
    position: Opt<"LEFT" | "RIGHT">("LEFT"),
    modules: {
      start: Opt<BarModule[]>(["Workspaces", "SystemMonitor", "Tray"]),
      center: Opt<BarModule[]>([]),
      end: Opt<BarModule[]>(["Volume", "DateTime"]),
    },
    workspaces: {
      dynamic: Opt(false),
      count: Opt(5),
    },
    tray: {
      hidden: Opt<string[]>(["Wayland to X11 Video bridge"]),
    },
  },
});
