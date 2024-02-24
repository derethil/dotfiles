import { matugenWallpaperMonitor } from "./matugen";
import { gtkThemeMonitor } from "./gtk";
import { cssMonitor } from "../style/style";
import { batteryMonitor } from "./battery";
import { notificationsMiddleware } from "./notifications";

export async function init() {
  try {
    gtkThemeMonitor();
    cssMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
  } catch (error) {
    logError(error);
  }
}
