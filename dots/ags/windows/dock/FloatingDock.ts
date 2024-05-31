import { isGdkMonitorActive } from "lib/utils";
import { Dock } from "./Dock";

const Hyprland = await Service.import("hyprland");

export function FloatingDock(monitor: number) {
  const revealer = Widget.Revealer({
    transition: "slide_up",
    child: Dock(),
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
    name: `dock${monitor}`,
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
        .on("enter-notify-event", () => revealer.reveal_child = true)
        .on("leave-notify-event", () => revealer.reveal_child = false),
  });
}
