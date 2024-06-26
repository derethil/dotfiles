import { Colors } from "lib/matugen";
import { mkOptions, Opt, opt } from "lib/option";
import { BarWidget } from "windows/bar/Bar";
import { Market, Resolution } from "services/wallpaper";

const optionsConfig = mkOptions(OPTIONS, {
  mode: opt<"desktop" | "laptop">("desktop"),
  autotheme: opt(true),
  user: opt(Utils.USER),

  wallpaperOpts: {
    resolution: opt<Resolution>(3840),
    market: opt<Market>("random"),
  },

  theme: {
    dark: {
      background: opt("#111318"),
      error: opt("#ffb4ab"),
      error_container: opt("#93000a"),
      inverse_on_surface: opt("#2e3036"),
      inverse_primary: opt("#405f90"),
      inverse_surface: opt("#e2e2e9"),
      on_background: opt("#e2e2e9"),
      on_error: opt("#690005"),
      on_error_container: opt("#ffdad6"),
      on_primary: opt("#09305f"),
      on_primary_container: opt("#d6e3ff"),
      on_primary_fixed: opt("#001b3d"),
      on_primary_fixed_variant: opt("#274777"),
      on_secondary: opt("#283141"),
      on_secondary_container: opt("#dae2f9"),
      on_secondary_fixed: opt("#121c2b"),
      on_secondary_fixed_variant: opt("#3e4758"),
      on_surface: opt("#e2e2e9"),
      on_surface_variant: opt("#c4c6cf"),
      on_tertiary: opt("#3f2845"),
      on_tertiary_container: opt("#f9d8fd"),
      on_tertiary_fixed: opt("#28132e"),
      on_tertiary_fixed_variant: opt("#563e5c"),
      outline: opt("#8e9099"),
      outline_variant: opt("#44474e"),
      primary: opt("#a9c7ff"),
      primary_container: opt("#274777"),
      primary_fixed: opt("#d6e3ff"),
      primary_fixed_dim: opt("#a9c7ff"),
      scrim: opt("#000000"),
      secondary: opt("#bdc7dc"),
      secondary_container: opt("#bdc7dc"),
      secondary_fixed: opt("#dae2f9"),
      secondary_fixed_dim: opt("#bdc7dc"),
      shadow: opt("#000000"),
      surface: opt("#111318"),
      surface_bright: opt("#37393e"),
      surface_container: opt("#1d2024"),
      surface_container_high: opt("#282a2f"),
      surface_container_highest: opt("#33353a"),
      surface_container_low: opt("#191c20"),
      surface_container_lowest: opt("#0c0e13"),
      surface_dim: opt("#111318"),
      surface_variant: opt("#44474e"),
      tertiary: opt("#dcbce1"),
      tertiary_container: opt("#563e5c"),
      tertiary_fixed: opt("#f9d8fd"),
      tertiary_fixed_dim: opt("#dcbce1"),
    } as Colors<Opt<string>>,

    light: {
      background: opt("#f9f9ff"),
      error: opt("#ba1a1a"),
      error_container: opt("#ffdad6"),
      inverse_on_surface: opt("#f0f0f7"),
      inverse_primary: opt("#a9c7ff"),
      inverse_surface: opt("#2e3036"),
      on_background: opt("#191c20"),
      on_error: opt("#ffffff"),
      on_error_container: opt("#410002"),
      on_primary: opt("#ffffff"),
      on_primary_container: opt("#001b3d"),
      on_primary_fixed: opt("#001b3d"),
      on_primary_fixed_variant: opt("#274777"),
      on_secondary: opt("#ffffff"),
      on_secondary_container: opt("#121c2b"),
      on_secondary_fixed: opt("#121c2b"),
      on_secondary_fixed_variant: opt("#3e4758"),
      on_surface: opt("#191c20"),
      on_surface_variant: opt("#44474e"),
      on_tertiary: opt("#ffffff"),
      on_tertiary_container: opt("#28132e"),
      on_tertiary_fixed: opt("#28132e"),
      on_tertiary_fixed_variant: opt("#563e5c"),
      outline: opt("#74777f"),
      outline_variant: opt("#c4c6cf"),
      primary: opt("#405f90"),
      primary_container: opt("#d6e3ff"),
      primary_fixed: opt("#d6e3ff"),
      primary_fixed_dim: opt("#a9c7ff"),
      scrim: opt("#000000"),
      secondary: opt("#555f71"),
      secondary_container: opt("#555f71"),
      secondary_fixed: opt("#dae2f9"),
      secondary_fixed_dim: opt("#bdc7dc"),
      shadow: opt("#000000"),
      source_color: opt("#4b6ca2"),
      surface: opt("#f9f9ff"),
      surface_bright: opt("#f9f9ff"),
      surface_container: opt("#ededf4"),
      surface_container_high: opt("#e7e8ee"),
      surface_container_highest: opt("#e2e2e9"),
      surface_container_low: opt("#f3f3fa"),
      surface_container_lowest: opt("#ffffff"),
      surface_dim: opt("#d9d9e0"),
      surface_variant: opt("#e0e2ec"),
      tertiary: opt("#6f5575"),
      tertiary_container: opt("#f9d8fd"),
      tertiary_fixed: opt("#f9d8fd"),
      tertiary_fixed_dim: opt("#dcbce1"),
    } as Colors<Opt<string>>,

    accents: {
      red: opt("#ff5d62"),
      green: opt("#98bb6c"),
      yellow: opt("#dca561"),
      blue: opt("#7e9cd8"),
      magenta: opt("#957fb8"),
      teal: opt("#6a9589"),
      orange: opt("#ff9e3b"),
    },

    blur: opt(true),

    scheme: opt<"dark" | "light">("dark"),
    widget: { transparency: opt(20) },
    border: {
      width: opt(2),
      transparency: opt(96),
    },

    padding: opt(7),
    spacing: opt(9),
    radius: opt(8),

    font: {
      ui: {
        size: opt(13),
        name: opt("SF Pro Display"),
      },
      mono: {
        size: opt(13),
        name: opt("Liga SFMono Nerd Font"),
      },
    },

    hyprland: {
      singleTiledGaps: {
        left: opt(500),
        right: opt(500),
      },
      shadows: opt(true),
      gaps: opt(1.3333),
      inactiveBorder: opt("#000000"),
    },
  },

  transition: opt(150),

  bar: {
    flatButtons: opt(true),
    position: opt<"left" | "right">("left"),
    corners: opt(false),
    onlyPrimary: opt(false),

    layout: {
      start: opt<BarWidget[]>(["window", "workspaces", "systemTray", "media"]),
      center: opt<BarWidget[]>([]),
      end: opt<BarWidget[]>(["weather", "audio", "clock", "powermenu"]),
    },

    date: {
      format: opt("%I\n%M"),
    },

    weather: {
      units: opt<"metric" | "imperial">("imperial"),
      location: {
        lat: opt(38.9202),
        lon: opt(-77.0158),
      },
    },

    media: {
      preferred: opt("spotify"),
    },

    battery: {
      low: opt(15),
      med: opt(30),
    },

    workspaces: {
      iconSize: opt(18),
      minimum: opt(5),
    },

    tray: {
      hidden: opt(["Wayland to X11 Video bridge", "spotify"]),
    },
  },

  osd: {
    progress: {
      vertical: opt(false),
      pack: {
        h: opt<"start" | "center" | "end">("center"),
        v: opt<"start" | "center" | "end">("end"),
      },
    },
    microphone: {
      pack: {
        h: opt<"start" | "center" | "end">("center"),
        v: opt<"start" | "center" | "end">("end"),
      },
    },
  },

  notifications: {
    position: opt<Array<"top" | "bottom" | "left" | "right">>(["top", "right"]),
    blacklist: opt(["Spotify"]),
    width: opt(440),
  },

  dashboard: {
    avatar: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),

    projects: {
      command: opt("code -r %d"),
      dynamic: opt([
        "~/development/personal",
        "~/development/personal/school/*",
        "~/development/dragonarmy",
      ]),
      static: opt(["~/.dotfiles/"]),
    },
  },

  eyenudge: {
    interval: opt(1200),
    duration: opt(20),
  },

  docks: {
    iconSize: opt(32),
    screenshotFolder: opt("~/Pictures/Screenshots/"),
    pinnedApps: opt<string[]>([
      "firefox",
      "wezterm",
      "neovide",
      "discord",
      "mattermost",
      "obsidian",
      "spotify",
      "steam",
      "stremio",
    ]),
  },
});

declare global {
  const options: typeof optionsConfig;
}

export const options = optionsConfig;

Object.assign(globalThis, {
  options,
});
