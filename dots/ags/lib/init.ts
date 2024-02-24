import { matugenWallpaperMonitor } from "./matugen";
import { gtkThemeMonitor } from "./gtk";
import { cssMonitor } from "../style/style";
import { batteryMonitor } from "./battery";
import { notificationsMiddleware } from "./notifications";
import { wallpaperMonitor } from "./swww";
import { hyprlandOptions } from "./hyprland";
import { globalServices } from "./globals";

export async function init() {
  try {
    globalServices();
    gtkThemeMonitor();
    cssMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
    hyprlandOptions();
    wallpaperMonitor();
  } catch (error) {
    logError(error);
  }
}
