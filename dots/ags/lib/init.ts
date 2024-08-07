import { batteryMonitor } from "./battery";
import { globalServices } from "./globals";
import { gtkThemeMonitor } from "./gtk";
import { hyprlandOptions } from "./hyprland";
import { matugenWallpaperMonitor } from "./matugen";
import { notificationsMiddleware } from "./notifications";

const Notifications = await Service.import("notifications");
const Audio = await Service.import("audio");

export async function init() {
  try {
    globalServices();
    gtkThemeMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
    hyprlandOptions();

    // Service Properties
    Notifications.popupTimeout = 5000;
    Audio.maxStreamVolume = 1;
  } catch (error) {
    logError(error);
  }
}
