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
        icon: icons.ui.overview,
        tooltip: "Open Overview",
      }),
      DockButton({
        handlePrimaryClick: () => App.toggleWindow(`notifications`),
        icon: icons.notifications.base,
        tooltip: "Notifications",
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
      }),
      DockButton({
        handlePrimaryClick: () => App.toggleWindow("settings"),
        icon: icons.ui.settings,
        tooltip: "UI Settings",
      }),
      DockButton({
        handlePrimaryClick: () => {
          const scheme = options.theme.scheme;
          scheme.value = scheme.value === "dark" ? "light" : "dark";
        },
        icon: options.theme.scheme.bind().as((s) => icons.schemes[s]),
        tooltip: "Switch Theme",
      }),
      DockButton({
        icon: icons.tools.speaker,
        tooltip: "Audio",
        handlePrimaryClick: () => toggleCurrentTool("audio"),
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
      }),
      DockButton({
        handlePrimaryClick: () => Utils.execAsync("hyprpicker -a"),
        icon: icons.tools.colorpicker,
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
