import { batteryMonitor } from "./battery";
import { globalServices } from "./globals";
import { gtkThemeMonitor } from "./gtk";
import { hyprlandOptions } from "./hyprland";
import { matugenWallpaperMonitor } from "./matugen";
import { notificationsMiddleware } from "./notifications";
import { userListener } from "./user.local";

const Notifications = await Service.import("notifications");

export async function init() {
  try {
    globalServices();
    gtkThemeMonitor();
    matugenWallpaperMonitor();
    batteryMonitor();
    notificationsMiddleware();
    hyprlandOptions();
    userListener();

    // Service Properties
    Notifications.popupTimeout = 5000;
  } catch (error) {
    logError(error);
  }
}
