import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import Gtk from "gi://Gtk";
import options from "../options.js";
import { reloadScss, scssWatcher } from "./scss.js";
import { hyprlandInit, setupHyprland } from "./hyprland.js";
import { globals } from "./globals.js";

export default function init() {
  notificationBlacklist();
  globals();
  gsettingsColorScheme();
  gtkFontSettings();
  scssWatcher();
  dependandOptions();

  reloadScss();
  hyprlandInit();
  setupHyprland();
}

function dependandOptions() {
  options.bar.style.connect("changed", ({ value }) => {
    if (value !== "normal")
      options.desktop.screen_corners.setValue(false, true);
  });
}

function notificationBlacklist() {
  Notifications.connect("notified", (_, id) => {
    const n = Notifications.getNotification(id);
    options.notifications.black_list.value.forEach((item) => {
      if (n?.app_name.includes(item) || n?.app_entry?.includes(item)) n.close();
    });
  });
}

function gtkFontSettings() {
  const settings = Gtk.Settings.get_default();
  if (!settings) {
    console.error(Error("Gtk.Settings unavailable"));
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
  if (!Utils.exec("which gsettings")) return;

  options.theme.scheme.connect("changed", ({ value }) => {
    const gsettings = "gsettings set org.gnome.desktop.interface color-scheme";
    Utils.execAsync(`${gsettings} "prefer-${value}"`).catch((err) =>
      console.error(err.message)
    );
  });
}
