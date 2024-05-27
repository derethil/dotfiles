import { batteryMonitor } from "./battery";
import { globalServices } from "./globals";
import { gtkThemeMonitor } from "./gtk";
import { hyprlandOptions } from "./hyprland";
import { matugenWallpaperMonitor } from "./matugen";
import { notificationsMiddleware } from "./notifications";
import { userListener } from "./user.local";

export async function init() {
  try {
    globalServices();
    gtkThemeMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
    hyprlandOptions();
    userListener();
  } catch (error) {
    logError(error);
  }
}
