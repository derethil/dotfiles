import { matugenWallpaperMonitor } from "./matugen";
import { gtkThemeMonitor } from "./gtk";
import { batteryMonitor } from "./battery";
import { notificationsMiddleware } from "./notifications";
import { hyprlandOptions } from "./hyprland";
import { globalServices } from "./globals";

export async function init() {
  try {
    globalServices();
    gtkThemeMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
    hyprlandOptions();
  } catch (error) {
    logError(error);
  }
}
