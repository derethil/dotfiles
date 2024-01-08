/**
 * A theme is a set of options that will be applied
 * on top of the default values. See option.js for possible values.
 */

import { Theme, AssetPath } from "./settings/theme.js";

export default [
  Theme({
    name: "Kanagawa Dark",
    icon: "🌊",
    "desktop.wallpaper.img": AssetPath("wallpaper.jpg"),
  }),
];
