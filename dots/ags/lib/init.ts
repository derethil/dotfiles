import { matugenWallpaperMonitor } from "./matugen";
import { gtkThemeMonitor } from "./gtk";
import { cssMonitor } from "../style/style";
import { batteryMonitor } from "./battery";
import { notificationsMiddleware } from "./notifications";
import { wallpaperMonitor } from "./swww";

export async function init() {
  try {
    gtkThemeMonitor();
    cssMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
    wallpaperMonitor();
  } catch (error) {
    logError(error);
  }
}
