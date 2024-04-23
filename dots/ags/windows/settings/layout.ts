import { Row } from "./Row";
import { Group } from "./Group";
import { Page } from "./Page";
import { Wallpaper } from "./Wallpaper";
import { icons } from "lib/icons";

const { theme, autotheme, bar } = options;

// deno-fmt-ignore
export const Layout = [
  Page({
    title: "Theme",
    icon: icons.ui.themes,
    groups: [
      Group({
        title: "",
        rows: [
          Wallpaper() as ReturnType<typeof Row>,
          Row({ opt: autotheme, title: "Auto Generate Color Scheme" }),
          Row({ opt: theme.scheme, title: "Color Scheme", type: "enum", enums: ["dark", "light"] }),
        ],
      }),
      Group({
        title: "Theme",
        rows: [
          Row({ opt: theme.hyprland.shadows, title: "Shadows" }),
          Row({ opt: theme.widget.opacity, title: "Widget Opacity", max: 100 }),
          Row({ opt: theme.border.transparency, title: "Border Transparency", max: 100 }),
          Row({ opt: theme.border.width, title: "Border Width", max: 100 }),
          Row({ opt: theme.blur, title: "Blur", note: "0 to disable", max: 70 })
        ],
      }),
      Group({
        title: "Accent Colors",
        rows: [
          Row({ opt: theme.accents.red, title: "Red", type: "color" }),
          Row({ opt: theme.accents.green, title: "Green", type: "color" }),
          Row({ opt: theme.accents.yellow, title: "Yellow", type: "color" }),
          Row({ opt: theme.accents.blue, title: "Blue", type: "color" }),
          Row({ opt: theme.accents.magenta, title: "Magenta", type: "color" }),
          Row({ opt: theme.accents.teal, title: "Teal", type: "color" }),
          Row({ opt: theme.accents.orange, title: "Orange", type: "color" }),
        ]
      }),
      Group({
        title: "UI",
        rows: [
          Row({ opt: theme.padding, title: "Padding" }),
          Row({ opt: theme.spacing, title: "Spacing" }),            
          Row({ opt: theme.radius, title: "Roundness" }),
        ]}
      ),
      Group({
        title: "Fonts",
        rows: [
          Row({ opt: theme.font.ui.name, title: "Main Font Name", type: "font"}),
          Row({ opt: theme.font.ui.size, title: "Main Font Size" }),
          Row({ opt: theme.font.mono.name, title: "Mono Font Name", type: "font"}),
          Row({ opt: theme.font.mono.size, title: "Mono Font Size" }),
        ]}
      ),
    ],
  }),
  Page({
    title: "Bar",
    icon: icons.ui.toolbars,
    groups: [
      Group({
        title: "General",
        rows: [
          Row({ opt: bar.position, title: "Position", type: "enum", enums: ["left", "right"] }),
          Row({ opt: bar.onlyPrimary, title: "Icon Module Primary Background" }),
        ]
      }),
      Group({
        title: "Date",
        rows: [
          Row({opt: bar.date.format, title: "Date Format", type: "object"}),
        ]
      }),
      Group({
        title: "System Tray",
        rows: [
          Row({ opt: bar.tray.hidden, title: "Hidden Tray Items", type: "object", note: "Takes a JSON list of classnames to hide" })
        ]
      }),
      Group({
        title: "Workspaces",
        rows: [
          Row({ opt: bar.workspaces.minimum, title: "Minimum Shown In Bar", note: "0 for fully dynamic workspaces" })
        ]
      }),
      Group({
        title: "Battery",
        rows: [
          Row({ opt: bar.battery.low, title: "Critical Battery Threshold" }),
          Row({ opt: bar.battery.med, title: "Low Battery Threshold" }),
        ]
      }),
      Group({
        title: "Media",
        rows: [
          Row({ opt: bar.media.preferred, title: "Preferred Player" })
        ]
      }),
      Group({
        title: "Weather",
        rows: [
          Row({ opt: bar.weather.location.lat, title: "Latitude", type: "object" }),
          Row({ opt: bar.weather.location.lon, title: "Longitude", type: "object" }),
          Row({ opt: bar.weather.units, title: "Units", type: "enum", enums: ["metric", "imperial"] }),
        ]
      })
    ]
  }),
  Page({
    title: "General",
    icon: icons.ui.settings,
    groups: [
      Group({
        title: "",
        rows: [
          Row({ opt: options.mode, title: "Form Factor", type: "enum", enums: ["laptop", "desktop"] })
        ]
      }),
      Group({
        title: "Hyprland",
        rows: [
          Row({ opt: theme.hyprland.singleTiledGaps.left, title: "Left Gaps on Single Tiled" }),
          Row({ opt: theme.hyprland.singleTiledGaps.right, title: "Right Gaps on Single Tiled" }),
          Row({ opt: theme.hyprland.inactiveBorder, title: "Inactive Border", type: "color" })
        ]
      }),
      Group({
        title: "On Screen Indicator",
        rows: [
            Row({ opt: options.osd.progress.vertical, title: "Vertical" }),
            Row({ opt: options.osd.progress.pack.h, title: "Horizontal Alignment", type: "enum", enums: ["start", "center", "end"] }),
            Row({ opt: options.osd.progress.pack.v, title: "Vertical Alignment", type: "enum", enums: ["start", "center", "end"] }),
        ]
      })
    ]
  })
] as const;
