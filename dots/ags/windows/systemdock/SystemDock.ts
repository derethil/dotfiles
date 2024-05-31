import { isGdkMonitorActive } from "lib/utils";
import { Tools } from "./modules/Tools";
import { NotificationsButton } from "./modules/NotificationsButton";

const Hyprland = await Service.import("hyprland");

export function SystemDock(monitor: number) {
  const dock = Widget.Box({
    className: "system-dock",
    children: [
      Tools(),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
      }),
      NotificationsButton(),
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

  return Widget.Window({
    monitor,
    name: `system-dock-${monitor}`,
    className: "floating-dock",
    anchor: ["top"],
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
        .on("enter-notify-event", () => revealer.reveal_child = true)
        .on("leave-notify-event", () => revealer.reveal_child = false),
  });
}
