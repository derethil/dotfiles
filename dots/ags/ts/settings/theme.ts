import App from "resource:///com/github/Aylur/ags/app.js";
import options from "ts/options";
import themes from "ts/themes";
import { reloadScss } from "./scss";
import { setupHyprland } from "./hyprland";

interface ThemeParams extends Record<string, unknown> {
  name: string;
  icon: string;
}

export function setTheme(name: string) {
  options.reset();
  const theme = themes.find((theme) => theme.name === name);

  if (!theme) return print(`No theme named ${name} found.`);

  options.apply(theme.options);
  reloadScss();
  setupHyprland();
}

export const AssetPath = (filepath: string) =>
  `${App.configDir}/assets/${filepath}`;

export const Theme = ({ name, icon = " ", ...options }: ThemeParams) => ({
  name,
  icon,
  options: {
    "theme.name": name,
    "theme.icon": icon,
    ...options,
  },
});

// let settingsDialog:
//
// export async function openSettings() {
//   if (settingsDialog) return settingsDialog.present();

//   try {
//     settingsDialog = (await import("./settingsDialog")).default;
//     settingsDialog.present();
//   } catch (error) {
//     if (error instanceof Error) console.error(error.message);
//   }
// }
