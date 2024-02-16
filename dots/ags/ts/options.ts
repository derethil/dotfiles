/**
 * An object holding Options that are Variables with cached values.
 *
 * to update an option at runtime simply run
 * ags -r "options.path.to.option.setValue('value')"
 *
 * resetting:
 * ags -r "options.reset()"
 */

import {
  Option,
  apply,
  getOptions,
  getValues,
  resetOptions,
} from "./settings/option";
import themes from "./themes";

export default {
  reset: resetOptions,
  values: getValues,
  apply: apply,
  list: getOptions,

  mode: Option<"desktop" | "laptop">("desktop", {
    category: "exclude",
    enums: ["desktop", "laptop"],
    type: "enum",
  }),

  spacing: Option(9, {
    note: "Spacing between windows and widgets",
  }),
  padding: Option(8),
  radii: Option(8),

  color: {
    red: Option("#ff5d62", { scss: "red" }),
    green: Option("#98bb6c", { scss: "green" }),
    yellow: Option("#dca561", { scss: "yellow" }),
    blue: Option("#7e9cd8", { scss: "blue" }),
    magenta: Option("#957fb8", { scss: "magenta" }),
    teal: Option("#6a9589", { scss: "teal" }),
    orange: Option("#ff9e3b", { scss: "orange" }),
  },

  transition: Option(200, {
    category: "exclude",
    note: "Transition time on animations in ms, e.g. on hover",
    unit: "ms",
  }),

  theme: {
    name: Option(themes[0].name, {
      category: "exclude",
      note: "Name to show as active in quicktoggles",
    }),

    icon: Option(themes[0].icon, {
      category: "exclude",
      note: "Icon to show as active in quicktoggles",
    }),

    scheme: Option<"dark" | "light">("dark", {
      enums: ["dark", "light"],
      type: "enum",
      note: 'Color scheme to set on Gtk apps: "light" or "dark"',
      title: "Color Scheme",
      scss: "color-scheme",
    }),

    background: Option("#1f1f28", {
      title: "Background Color",
      scss: "background",
    }),

    foreground: Option("#dcd7ba", {
      title: "Foreground Color",
      scss: "foreground",
    }),

    widget: {
      bg: Option("$background", {
        category: "Theme",
        title: "Widget Background Color",
        scss: "_widget-bg",
      }),
      opacity: Option(10, {
        category: "Theme",
        title: "Widget Background Transparency",
        unit: "",
        scss: "widget-transparency",
      }),
    },

    accent: {
      accent: Option("$magenta", {
        category: "Theme",
        title: "Accent Color",
        scss: "accent",
      }),
      fg: Option("#141414", {
        category: "Theme",
        title: "Accent Foreground Color",
        scss: "accent-foreground",
      }),
      gradient: Option("to right, $accent, lighten($accent, 6%)", {
        category: "Theme",
        title: "Accent Linear Gradient",
        scss: "accent-gradient",
      }),
    },
  },

  font: {
    font: Option("SF Pro Display", {
      type: "font",
      title: "Font",
      scss: "font",
    }),

    mono: Option("Liga SFMono Nerd Font", {
      type: "font",
      title: "Monospaced Font",
      scss: "mono-font",
    }),

    size: Option(13, {
      scss: "font-size",
      unit: "pt",
    }),
  },

  bar: {
    position: Option<"left" | "right">("left", {
      enums: ["left", "right"],
      type: "enum",
    }),

    flat_buttons: Option(true, { scss: "bar-flat-buttons" }),

    icon: Option("distro-icon", {
      note: '"distro-icon" or a single font',
    }),

    width: Option(72, {
      scss: "bar-width",
      note: "units are 'px'",
    }),
  },

  hypr: {
    inactive_border: Option("rgba(727169aa)", {
      category: "Border",
      title: "Border on Inactive Windows",
      scss: "exclude",
    }),

    wm_gaps_multiplier: Option(1.4, {
      category: "General",
      scss: "wm-gaps-multiplier",
      note: "wm-gaps: spacing x this",
      type: "float",
      unit: "",
    }),

    single_window_width: Option(2400, {
      category: "General",
      scss: "exclude",
      note: "Window width when only one window is open (set to 0 to disable)",
      type: "float",
    }),

    blur: Option<"*" | Array<string>>(["dashboard"]),
    alpha: Option(0.3),
  },

  notifications: {
    black_list: Option(["Spotify"], {
      note: "app-name | entry",
    }),
  },

  border: {
    color: Option("#727169", {
      category: "Border",
      title: "Border Color",
      scss: "_border-color",
    }),
    opacity: Option(100, {
      category: "Border",
      title: "Border Transparency",
      scss: "border-transparency",
      unit: "",
    }),
    width: Option(2, {
      category: "Border",
      title: "Border Width",
    }),
  },

  desktop: {
    drop_shadow: Option(true, { scss: "drop-shadow" }),
    shadow: Option("rgba(0, 0, 0, .6)", { scss: "shadow" }),
  },

  popover_padding_multiplier: Option(1.4, {
    category: "General",
    note: "popover-padding: padding x this",
    type: "float",
    unit: "",
  }),

  min_workspaces: Option(5, {
    category: "Bar",
    title: "Minimum workspaces on bar and overview",
  }),

  weather: {
    location: {
      lat: Option(38.9202, {
        title: "Latitude",
        scss: "exclude",
      }),
      lon: Option(-77.0375, {
        title: "Longitude",
        scss: "exclude",
      }),
    },
    units: Option<"metric" | "imperial">("imperial", {
      enums: ["metric", "imperial"],
      type: "enum",
      scss: "exclude",
    }),
  },

  tray: {
    disable: Option(false, {
      category: "bar",
      note: "Disable the tray",
      scss: "exclude",
    }),
    showModuleIcon: Option(false, {
      category: "bar",
      note: "Show the module icon in the bar",
      scss: "exclude",
    }),

    exclude: Option(["Wayland to X11 Video bridge"], {
      category: "bar",
      type: "string",
      note: "List of apps to exclude from the tray (based on their title)",
      scss: "exclude",
    }),
  },

  mpris: {
    preferred: Option("spotify", {
      category: "bar",
      note: "Preferred player to show in the bar",
      scss: "exclude",
    }),
  },

  substitutions: {
    icons: [["code-url-handler", "code"]],
  },
};
