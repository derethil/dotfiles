import { Variable } from "astal";
import Hyprland from "gi://AstalHyprland";

export function isUrgent(workspace: Variable<Hyprland.Workspace>) {
  const urgent = Variable(false);
  const hypr = Hyprland.get_default();

  const urgencyHandlers = [
    hypr.connect("urgent", (_, client) => {
      const within = client.workspace === workspace.get();
      const focused = hypr.get_focused_workspace() === workspace.get();
      if (client && within && !focused) {
        urgent.set(true);
      }
    }),
    hypr.connect("notify::focused-workspace", () => {
      if (hypr.get_focused_workspace() === workspace.get()) {
        urgent.set(false);
      }
    }),
  ];

  return {
    urgent,
    destroyUrgencyHandlers: () => {
      urgencyHandlers.forEach((handler) => hypr.disconnect(handler));
    },
  };
}
