import { isGdkMonitorActive } from "lib/utils";
import { CurrentTool, toggleCurrentTool } from "./modules/CurrentTool";
import { NotificationsButton } from "./modules/NotificationsButton";
import { UpdatesModule } from "./modules/PackageUpdates";
import { SystemButtons } from "./modules/SystemButtons";

const Hyprland = await Service.import("hyprland");

export function SystemDock(monitor: number) {
  const revealer = Widget.Revealer({
    reveal_child: true,
    transition: "slide_down",
    transitionDuration: options.transition.bind(),
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Box({
          className: "system-dock",
          children: [
            SystemButtons(),
            Widget.Separator({
              vpack: "center",
              hpack: "center",
            }),
            UpdatesModule(),
            NotificationsButton(),
          ],
        }),
        CurrentTool(),
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
    if (!reveal) toggleCurrentTool();
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
