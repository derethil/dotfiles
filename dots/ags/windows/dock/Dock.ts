import { Client } from "types/service/hyprland";
import { PinnedApps } from "./PinnedApps";
import { Taskbar } from "./Taskbar";
import { AppButton } from "./AppButton";
import { icons } from "lib/icons";
import { bash } from "lib/utils";
const Hyprland = await Service.import("hyprland");

export const focusClient = ({ address }: Client) => {
  Hyprland.messageAsync(`dispatch focuswindow address:${address}`);
};

export const killClient = (client: Client) => bash(`kill -9 ${client.pid}`);

export function Dock() {
  const pinnedApps = PinnedApps();
  const taskbar = Taskbar();
  const appLauncher = AppButton({
    className: "launcher nonrunning",
    icon: icons.apps.apps,
    tooltipText: "Applications",
    onClicked: () => App.toggleWindow("dashboard"),
  });

  const taskbarSeparator = Widget.Separator({
    vpack: "center",
    hpack: "center",
    orientation: 1,
    setup: (self) =>
      self.hook(taskbar, () => {
        self.visible = taskbar.children.length > 0;
      }, "notify::children"),
  });

  const launcherSeparator = Widget.Separator({
    vpack: "center",
    hpack: "center",
    orientation: 1,
  });

  return Widget.Box({
    className: "dock",
    children: [
      appLauncher,
      launcherSeparator,
      pinnedApps,
      taskbarSeparator,
      taskbar,
    ],
  });
}
