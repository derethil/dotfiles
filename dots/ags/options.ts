import { opt, mkOptions } from "lib/option";
import { BarWidget } from "windows/bar/Bar";

const optionsConfig = mkOptions(OPTIONS, {
  mode: opt<"desktop" | "laptop">("desktop"),
  autotheme: opt(true),

  wallpaper: opt(`/home/${Utils.USER}/Pictures/wallpapers/catMachup.png`, {
    persistent: true,
  }),

  theme: {
    dark: {
      primary: {
        bg: opt("#51a4e7"),
        fg: opt("#141414"),
      },
      error: {
        bg: opt("#e55f86"),
        fg: opt("#141414"),
      },
      bg: opt("#171717"),
      fg: opt("#eeeeee"),
      widget: opt("#eeeeee"),
      border: opt("#eeeeee"),
    },

    light: {
      primary: {
        bg: opt("#426ede"),
        fg: opt("#eeeeee"),
      },
      error: {
        bg: opt("#b13558"),
        fg: opt("#eeeeee"),
      },
      bg: opt("#fffffa"),
      fg: opt("#080808"),
      widget: opt("#080808"),
      border: opt("#080808"),
    },

    accents: {
      red: opt("#ff5d62"),
      green: opt("#98bb6c"),
      yellow: opt("#dca561"),
      blue: opt("#7e9cd8"),
      magenta: opt("#957fb8"),
      teal: opt("#6a9589"),
      orange: opt("#ff9e3b"),
    },

    blur: opt(0),
    scheme: opt<"dark" | "light">("dark"),
    widget: { transparency: opt(94) },
    border: {
      width: opt(2),
      transparency: opt(96),
    },

    padding: opt(7),
    spacing: opt(9),
    radius: opt(8),

    hyprland: {
      shadows: opt(true),
      gaps: opt(1.3333),
      inactiveBorder: opt("#000000"),
    },
  },

  transition: opt(200),

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

  bar: {
    flatButtons: opt(true),
    position: opt<"left" | "right">("left"),
    corners: opt(false),

    layout: {
      start: opt<BarWidget[]>(["dashboard", "workspaces", "systemTray", "media"]),
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
      minimum: opt(5),
    },

    tray: {
      hidden: opt(["Wayland to X11 Video bridge"]),
    },
  },

  dashboard: {
    avatar: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
  },

  notifications: {
    blacklist: opt(["Spotify"]),
  },
});

declare global {
  const options: typeof optionsConfig;
}

export const options = optionsConfig;

Object.assign(globalThis, {
  options,
});
