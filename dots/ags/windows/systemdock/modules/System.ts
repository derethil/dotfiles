import { icons } from "lib/icons";
import { DockButton } from "../DockButton";
import { toggleCurrentTool } from "../CurrentTool";

const Hyprland = await Service.import("hyprland");

export function System() {
  return Widget.Box({
    className: "dock-module",
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
        icon: icons.audio.volume.high,
        tooltip: "Audio",
        handlePrimaryClick: () => toggleCurrentTool("audio"),
      }),
      DockButton({
        handlePrimaryClick: () => Utils.execAsync("hyprpicker -a"),
        icon: icons.tools.colorPicker,
        tooltip: "Color Picker",
      }),
      DockButton({
        activeOnTool: "screenshot",
        handlePrimaryClick: () => toggleCurrentTool("screenshot"),
        icon: icons.tools.screenshot,
        tooltip: "Screenshot",
      }),
    ],
  });
}