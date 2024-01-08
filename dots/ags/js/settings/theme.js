import App from "resource:///com/github/Aylur/ags/app.js";
import options from "../options.js";
import themes from "../themes.js";
import { reloadScss } from "./scss.js";
import { setupHyprland } from "./hyprland.js";

/**
 * @typedef {object} ThemeParams
 * @param {string} name
 * @param {string} icon
 * @param {object} options
 */

/** @param {string} name */
export function setTheme(name) {
  options.reset();
  const theme = themes.find((theme) => theme.name === name);

  if (!theme) return print(`No theme named ${name} found.`);

  options.apply(theme.options);
  reloadScss();
  setupHyprland();
}

/** @param {string} filepath */
export const AssetPath = (filepath) => `${App.configDir}/assets/${filepath}`;

/**
 * Create a theme object.
 * @param {ThemeParams} themeparams */
export const Theme = ({ name, icon = " ", ...options }) => ({
  name,
  icon,
  options: {
    "theme.name": name,
    "theme.icon": icon,
    ...options,
  },
});

let settingsDialog;
export async function openSettings() {
  if (settingsDialog) return settingsDialog.present();

  try {
    settingsDialog = (await import("./settingsDialog")).default;
    settingsDialog.present();
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
