import { icons } from "lib/icons";
import { DockButton } from "./DockButton";
import { toggleToolDock } from "./ToolDock";

const Hyprland = await Service.import("hyprland");

export function SystemButtons() {
  return Widget.Box({
    className: "tools",
    hexpand: true,
    children: [
      DockButton({
        handlePrimaryClick: () =>
          Hyprland.messageAsync("dispatch hyprexpo:expo toggle"),
        icon: icons.tools.workspaces,
        tooltip: "Workspaces",
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
      }),
      DockButton({
        handlePrimaryClick: () => App.toggleWindow("settings"),
        icon: icons.ui.settings,
        tooltip: "AGS Settings",
      }),
      DockButton({
        handlePrimaryClick: () => Utils.execAsync("hyprpicker -a"),
        icon: icons.tools.colorPicker,
        tooltip: "Color Picker",
      }),
      DockButton({
        handlePrimaryClick: () =>
          // Utils.execAsync("hyprshot -m region --clipboard-only"),
          toggleToolDock("screenshot"),
        icon: icons.tools.screenshot,
        tooltip: "Screenshot",
      }),
    ],
  });
}
