import { options } from "options";
import { sh, dependencies } from "./utils";
import { Opt } from "./option";

export function matugenWallpaperMonitor() {
  options.wallpaper.connect("changed", () => matugen());
  options.autotheme.connect("changed", () => matugen());
  matugen();
}

export async function matugen(type: "image" | "color" = "image", arg = options.wallpaper.value) {
  if (!options.autotheme.value || !dependencies("matugen")) return;

  const colors = await sh(`matugen --dry-run -j hex ${type} ${arg}`);
  const generated = JSON.parse(colors).colors as { light: Colors; dark: Colors };

  const themeOptions = { dark: options.theme.dark, light: options.theme.light } as {
    dark: Colors<Opt<string>>;
    light: Colors<Opt<string>>;
  };

  Object.entries(generated).forEach(([theme, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      const themeKey = theme as "light" | "dark";
      const colorKey = key as keyof Colors;
      themeOptions[themeKey][colorKey].value = value;
    });
  });
}

export type Colors<T = string> = {
  background: T;
  error: T;
  error_container: T;
  inverse_on_surface: T;
  inverse_primary: T;
  inverse_surface: T;
  on_background: T;
  on_error: T;
  on_error_container: T;
  on_primary: T;
  on_primary_container: T;
  on_primary_fixed: T;
  on_primary_fixed_variant: T;
  on_secondary: T;
  on_secondary_container: T;
  on_secondary_fixed: T;
  on_secondary_fixed_variant: T;
  on_surface: T;
  on_surface_variant: T;
  on_tertiary: T;
  on_tertiary_container: T;
  on_tertiary_fixed: T;
  on_tertiary_fixed_variant: T;
  outline: T;
  outline_variant: T;
  primary: T;
  primary_container: T;
  primary_fixed: T;
  primary_fixed_dim: T;
  scrim: T;
  secondary: T;
  secondary_container: T;
  secondary_fixed: T;
  secondary_fixed_dim: T;
  shadow: T;
  surface: T;
  surface_bright: T;
  surface_container: T;
  surface_container_high: T;
  surface_container_highest: T;
  surface_container_low: T;
  surface_container_lowest: T;
  surface_dim: T;
  surface_variant: T;
  tertiary: T;
  tertiary_container: T;
  tertiary_fixed: T;
  tertiary_fixed_dim: T;
};
