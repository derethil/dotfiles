import { icons } from "lib/icons";
import { isGdkMonitorActive } from "lib/utils";
import { AppButton } from "./modules/AppButton";
import { Pinned } from "./modules/Pinned";
import { Taskbar } from "./modules/Taskbar";

const Hyprland = await Service.import("hyprland");

export function ApplicationDock(monitor: number) {
  const taskbar = Taskbar();

  const dock = Widget.Box({
    className: "application-dock",
    children: [
      AppButton({
        className: "launcher nonrunning",
        icon: icons.apps.apps,
        tooltipText: "Applications",
        onClicked: () => App.toggleWindow("dashboard"),
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
        orientation: 1,
      }),
      Pinned(),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
        orientation: 1,
        setup: (self) =>
          self.hook(taskbar, () => {
            self.visible = taskbar.children.length > 0;
          }, "notify::children"),
      }),
      taskbar,
    ],
  });

  const revealer = Widget.Revealer({
    transition: "slide_up",
    child: dock,
    setup: (self) => {
      const update = async () => {
        if (await isGdkMonitorActive(monitor)) {
          const workspace = Hyprland.getWorkspace(Hyprland.active.workspace.id);
          self.reveal_child = workspace?.windows === 0;
        }
      };

      self.hook(Hyprland, update, "client-added");
      self.hook(Hyprland, update, "client-removed");
      self.hook(Hyprland.active.workspace, update);
    },
  });

  const handleHover = (reveal: boolean) => {
    const workspace = Hyprland.getWorkspace(Hyprland.active.workspace.id);
    if (workspace?.windows === 0) return;
    revealer.reveal_child = reveal;
  };

  return Widget.Window({
    monitor,
    name: `applicationdock${monitor}`,
    className: "floating-dock",
    anchor: ["bottom"],
    child: Widget.Box({
      children: [
        revealer,
        Widget.Box({
          className: "padding",
          css: "padding: 2px",
        }),
      ],
    }),
    setup: (self) =>
      self
        .on("enter-notify-event", () => handleHover(true))
        .on("leave-notify-event", () => handleHover(false)),
  });
}
