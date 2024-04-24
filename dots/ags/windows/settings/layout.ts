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
    title: "Scheme",
    icon: icons.ui.scheme,
    groups: [
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
        title: "Dark Scheme",
        rows: [
          Row({ opt: theme.dark.background, title: "Background", type: "color" }),
          Row({ opt: theme.dark.error, title: "Error", type: "color" }),
          Row({ opt: theme.dark.error_container, title: "Error Container", type: "color" }),
          Row({ opt: theme.dark.inverse_on_surface, title: "Inverse on Surface", type: "color" }),
          Row({ opt: theme.dark.inverse_primary, title: "Inverse Primary", type: "color" }),
          Row({ opt: theme.dark.inverse_surface, title: "Inverse Surface", type: "color" }),
          Row({ opt: theme.dark.on_background, title: "On Background", type: "color" }),
          Row({ opt: theme.dark.on_error, title: "On Error", type: "color" }),
          Row({ opt: theme.dark.on_error_container, title: "On Error Container", type: "color" }),
          Row({ opt: theme.dark.on_primary, title: "On Primary", type: "color" }),
          Row({ opt: theme.dark.on_primary_container, title: "On Primary Container", type: "color" }),
          Row({ opt: theme.dark.on_primary_fixed, title: "On Primary Fixed", type: "color" }),
          Row({ opt: theme.dark.on_primary_fixed_variant, title: "On Primary Fixed Variant", type: "color" }),
          Row({ opt: theme.dark.on_secondary, title: "On Secondary", type: "color" }),
          Row({ opt: theme.dark.on_secondary_container, title: "On Secondary Container", type: "color" }),
          Row({ opt: theme.dark.on_secondary_fixed, title: "On Secondary Fixed", type: "color" }),
          Row({ opt: theme.dark.on_secondary_fixed_variant, title: "On Secondary Fixed Variant", type: "color" }),
          Row({ opt: theme.dark.on_surface, title: "On Surface", type: "color" }),
          Row({ opt: theme.dark.on_surface_variant, title: "On Surface Variant", type: "color" }),
          Row({ opt: theme.dark.on_tertiary, title: "On Tertiary", type: "color" }),
          Row({ opt: theme.dark.on_tertiary_container, title: "On Tertiary Container", type: "color" }),
          Row({ opt: theme.dark.on_tertiary_fixed, title: "On Tertiary Fixed", type: "color" }),
          Row({ opt: theme.dark.on_tertiary_fixed_variant, title: "On Tertiary Fixed Variant", type: "color" }),
          Row({ opt: theme.dark.outline, title: "Outline", type: "color" }),
          Row({ opt: theme.dark.outline_variant, title: "Outline Variant", type: "color" }),
          Row({ opt: theme.dark.primary, title: "Primary", type: "color" }),
          Row({ opt: theme.dark.primary_container, title: "Primary Container", type: "color" }),
          Row({ opt: theme.dark.primary_fixed, title: "Primary Fixed", type: "color" }),
          Row({ opt: theme.dark.primary_fixed_dim, title: "Primary Fixed Dim", type: "color" }),
          Row({ opt: theme.dark.scrim, title: "Scrim", type: "color" }),
          Row({ opt: theme.dark.secondary, title: "Secondary", type: "color" }),
          Row({ opt: theme.dark.secondary_container, title: "Secondary Container", type: "color" }),
          Row({ opt: theme.dark.secondary_fixed, title: "Secondary Fixed", type: "color" }),
          Row({ opt: theme.dark.secondary_fixed_dim, title: "Secondary Fixed Dim", type: "color" }),
          Row({ opt: theme.dark.shadow, title: "Shadow", type: "color" }),
          Row({ opt: theme.dark.surface, title: "Surface", type: "color" }),
          Row({ opt: theme.dark.surface_bright, title: "Surface Bright", type: "color" }),
          Row({ opt: theme.dark.surface_container, title: "Surface Container", type: "color" }),
          Row({ opt: theme.dark.surface_container_high, title: "Surface Container High", type: "color" }),
          Row({ opt: theme.dark.surface_container_highest, title: "Surface Container Highest", type: "color" }),
          Row({ opt: theme.dark.surface_container_low, title: "Surface Container Low", type: "color" }),
          Row({ opt: theme.dark.surface_container_lowest, title: "Surface Container Lowest", type: "color" }),
          Row({ opt: theme.dark.surface_dim, title: "Surface Dim", type: "color" }),
          Row({ opt: theme.dark.surface_variant, title: "Surface Variant", type: "color" }),
          Row({ opt: theme.dark.tertiary, title: "Tertiary", type: "color" }),
          Row({ opt: theme.dark.tertiary_container, title: "Tertiary Container", type: "color" }),
          Row({ opt: theme.dark.tertiary_fixed, title: "Tertiary Fixed", type: "color" }),
          Row({ opt: theme.dark.tertiary_fixed_dim, title: "Tertiary Fixed Dim", type: "color" }),
        ],
      }),
      Group({
        title: "Light Scheme",
        rows: [
          Row({ opt: theme.light.background, title: "Background", type: "color" }),
          Row({ opt: theme.light.error, title: "Error", type: "color" }),
          Row({ opt: theme.light.error_container, title: "Error Container", type: "color" }),
          Row({ opt: theme.light.inverse_on_surface, title: "Inverse on Surface", type: "color" }),
          Row({ opt: theme.light.inverse_primary, title: "Inverse Primary", type: "color" }),
          Row({ opt: theme.light.inverse_surface, title: "Inverse Surface", type: "color" }),
          Row({ opt: theme.light.on_background, title: "On Background", type: "color" }),
          Row({ opt: theme.light.on_error, title: "On Error", type: "color" }),
          Row({ opt: theme.light.on_error_container, title: "On Error Container", type: "color" }),
          Row({ opt: theme.light.on_primary, title: "On Primary", type: "color" }),
          Row({ opt: theme.light.on_primary_container, title: "On Primary Container", type: "color" }),
          Row({ opt: theme.light.on_primary_fixed, title: "On Primary Fixed", type: "color" }),
          Row({ opt: theme.light.on_primary_fixed_variant, title: "On Primary Fixed Variant", type: "color" }),
          Row({ opt: theme.light.on_secondary, title: "On Secondary", type: "color" }),
          Row({ opt: theme.light.on_secondary_container, title: "On Secondary Container", type: "color" }),
          Row({ opt: theme.light.on_secondary_fixed, title: "On Secondary Fixed", type: "color" }),
          Row({ opt: theme.light.on_secondary_fixed_variant, title: "On Secondary Fixed Variant", type: "color" }),
          Row({ opt: theme.light.on_surface, title: "On Surface", type: "color" }),
          Row({ opt: theme.light.on_surface_variant, title: "On Surface Variant", type: "color" }),
          Row({ opt: theme.light.on_tertiary, title: "On Tertiary", type: "color" }),
          Row({ opt: theme.light.on_tertiary_container, title: "On Tertiary Container", type: "color" }),
          Row({ opt: theme.light.on_tertiary_fixed, title: "On Tertiary Fixed", type: "color" }),
          Row({ opt: theme.light.on_tertiary_fixed_variant, title: "On Tertiary Fixed Variant", type: "color" }),
          Row({ opt: theme.light.outline, title: "Outline", type: "color" }),
          Row({ opt: theme.light.outline_variant, title: "Outline Variant", type: "color" }),
          Row({ opt: theme.light.primary, title: "Primary", type: "color" }),
          Row({ opt: theme.light.primary_container, title: "Primary Container", type: "color" }),
          Row({ opt: theme.light.primary_fixed, title: "Primary Fixed", type: "color" }),
          Row({ opt: theme.light.primary_fixed_dim, title: "Primary Fixed Dim", type: "color" }),
          Row({ opt: theme.light.scrim, title: "Scrim", type: "color" }),
          Row({ opt: theme.light.secondary, title: "Secondary", type: "color" }),
          Row({ opt: theme.light.secondary_container, title: "Secondary Container", type: "color" }),
          Row({ opt: theme.light.secondary_fixed, title: "Secondary Fixed", type: "color" }),
          Row({ opt: theme.light.secondary_fixed_dim, title: "Secondary Fixed Dim", type: "color" }),
          Row({ opt: theme.light.shadow, title: "Shadow", type: "color" }),
          Row({ opt: theme.light.surface, title: "Surface", type: "color" }),
          Row({ opt: theme.light.surface_bright, title: "Surface Bright", type: "color" }),
          Row({ opt: theme.light.surface_container, title: "Surface Container", type: "color" }),
          Row({ opt: theme.light.surface_container_high, title: "Surface Container High", type: "color" }),
          Row({ opt: theme.light.surface_container_highest, title: "Surface Container Highest", type: "color" }),
          Row({ opt: theme.light.surface_container_low, title: "Surface Container Low", type: "color" }),
          Row({ opt: theme.light.surface_container_lowest, title: "Surface Container Lowest", type: "color" }),
          Row({ opt: theme.light.surface_dim, title: "Surface Dim", type: "color" }),
          Row({ opt: theme.light.surface_variant, title: "Surface Variant", type: "color" }),
          Row({ opt: theme.light.tertiary, title: "Tertiary", type: "color" }),
          Row({ opt: theme.light.tertiary_container, title: "Tertiary Container", type: "color" }),
          Row({ opt: theme.light.tertiary_fixed, title: "Tertiary Fixed", type: "color" }),
          Row({ opt: theme.light.tertiary_fixed_dim, title: "Tertiary Fixed Dim", type: "color" }),
        ]
      })
    ]
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
          Row({ opt: bar.weather.location.lat, title: "Latitude", type: "float" }),
          Row({ opt: bar.weather.location.lon, title: "Longitude", type: "float" }),
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
