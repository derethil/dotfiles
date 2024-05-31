import { icons } from "lib/icons";
import { DockButton } from "./DockButton";

const Hyprland = await Service.import("hyprland");

export function Tools() {
  return Widget.Box({
    className: "tools",
    hexpand: true,
    children: [
      DockButton({
        handleClick: () =>
          Hyprland.messageAsync("dispatch hyprexpo:expo toggle"),
        icon: icons.tools.workspaces,
        tooltip: "Workspaces",
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
      }),
      DockButton({
        handleClick: () => App.toggleWindow("settings"),
        icon: icons.ui.settings,
        tooltip: "AGS Settings",
      }),
      DockButton({
        handleClick: () => Utils.execAsync("hyprpicker -a"),
        icon: icons.tools.colorPicker,
        tooltip: "Color Picker",
      }),
      DockButton({
        handleClick: () =>
          Utils.execAsync("hyprshot -m region --clipboard-only"),
        icon: icons.tools.screenshot,
        tooltip: "Screenshot",
      }),
    ],
  });
}
