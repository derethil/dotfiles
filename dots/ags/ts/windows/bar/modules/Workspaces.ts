import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import FontIcon from "ts/widgets/FontIcon.js";
import icons from "ts/icons.js";
import { range } from "ts/lib/utils.js";
import { Workspace } from "types/service/hyprland.js";

const dispatch = (arg: any) =>
  Utils.execAsync(`hyprctl dispatch workspace ${arg}`);

const Workspaces = ({ min_workspaces }: { min_workspaces: number }) => {
  const isVisible = (i: number, workspaces: Workspace[]) => {
    const max_used = workspaces.reduce((acc, cur) => Math.max(acc, cur.id), 0);
    return i <= Math.max(min_workspaces, max_used);
  };

  return Widget.Box({
    vertical: true,
    children: range(10).map((i) => {
      return Widget.Button({
        class_name: "workspace",
        child: FontIcon({
          label: icons.workspace,
          class_name: "indicator",
        }),
        on_clicked: () => dispatch(i),
        setup: (self) => {
          // Hide unused workspaces above the minimum
          self.bind("visible", Hyprland, "workspaces", (workspaces) => {
            return isVisible(i, workspaces);
          });

          // Update the active workspace indicator
          self.hook(Hyprland, () => {
            self.toggleClassName("active", Hyprland.active.workspace.id === i);
            self.toggleClassName(
              "occupied",
              (Hyprland.getWorkspace(i)?.windows || 0) > 0
            );
            self.toggleClassName(
              "empty",
              (Hyprland.getWorkspace(i)?.windows || 0) === 0
            );
          });
        },
      });
    }),
  });
};

export default () =>
  Widget.EventBox({
    class_names: ["panel-button", "workspaces"],
    cursor: "pointer",
    // Nested to keep this consistent with the panel buttons
    child: Widget.Box({
      vertical: true,
      child: Widget.EventBox({
        on_scroll_up: () => dispatch("e-1"),
        on_scroll_down: () => dispatch("e+1"),
        class_name: "eventbox",
        child: Workspaces({
          min_workspaces: options.min_workspaces.value,
          // @ts-expect-error - .bind() is not typed to accept custom properties
        }).bind("min_workspaces", options.min_workspaces),
      }),
    }),
  });
