// import Notifications from "types/service/notifications";
import Gtk from "gi://Gtk?version=3.0";
import { globals } from "./globals";
import { dependencies } from "ts/lib/utils";
import { reloadScss, scssWatcher } from "./scss";
import { loadDotenv } from "ts/lib/dotenv";
import {
  centerSingleWindows,
  centerWindowsInit,
  setupHyprland,
} from "./hyprland";

export function init() {
  // Environment
  loadDotenv();

  // Settings
  notificationsBlacklist();
  globals();
  gsettingsColorScheme();
  gtkFontSettings();

  // Scss
  scssWatcher();
  reloadScss();

  // Hyprland Settings
  setupHyprland();

  // Start Scripts
  centerWindowsInit();
  centerSingleWindows();
}

function notificationsBlacklist() {
  // Notifications.connect("notified", (_, id: number) => {
  //   const n = Notifications.getNotification(id);
  //   options.notifications.black_list.value.forEach((item) => {
  //     if (n?.app_name.includes(item) || n?.app_entry?.includes(item)) n.close();
  //   });
  // });
}

function gtkFontSettings() {
  const settings = Gtk.Settings.get_default();
  if (!settings) {
    console.error("Gtk.Settings unavailable");
    return;
  }

  const callback = () => {
    const { size, font } = options.font;
    settings.gtk_font_name = `${font.value} ${size.value}`;
  };

  options.font.font.connect("notify::value", callback);
  options.font.size.connect("notify::value", callback);
}

function gsettingsColorScheme() {
  if (!dependencies("gsettings")) return;

  options.theme.scheme.connect("changed", ({ value }) => {
    const gsettings = "gsettings set org.gnome.desktop.interface color-scheme";
    Utils.execAsync(`${gsettings} "prefer-${value}"`).catch((err) =>
      console.error(err.message)
    );
  });
}
