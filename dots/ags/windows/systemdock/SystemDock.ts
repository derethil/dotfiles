import { isGdkMonitorActive } from "lib/utils";
import { SystemButtons } from "./modules/SystemButtons";
import { NotificationsButton } from "./modules/NotificationsButton";
import { toggleToolDock, ToolDock } from "./modules/ToolDock";

const Hyprland = await Service.import("hyprland");

export function SystemDock(monitor: number) {
  const dock = Widget.Box({
    className: "system-dock",
    vertical: true,
    children: [
      Widget.Box({
        children: [
          SystemButtons(),
          Widget.Separator({
            vpack: "center",
            hpack: "center",
          }),
          NotificationsButton(),
        ],
      }),
      ToolDock(),
    ],
  });

  const revealer = Widget.Revealer({
    transition: "slide_down",
    child: Widget.Box({
      vertical: true,
      children: [
        dock,
      ],
    }),
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
    if (!reveal) toggleToolDock();
  };

  return Widget.Window({
    monitor,
    name: `system-dock-${monitor}`,
    className: "floating-dock",
    anchor: ["top"],
    child: Widget.Box({
      children: [
        Widget.Box({
          className: "padding",
          css: "padding: 2px",
        }),
        revealer,
      ],
    }),
    setup: (self) =>
      self
        .on("enter-notify-event", () => handleHover(true))
        .on("leave-notify-event", () => handleHover(false)),
  });
}
