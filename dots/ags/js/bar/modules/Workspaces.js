import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";
import options from "../../options.js";
import FontIcon from "../../misc/FontIcon.js";
import icons from "../..//icons.js";
import { range } from "../..//utils.js";

/** @param {any} arg */
const dispatch = (arg) => Utils.execAsync(`hyprctl dispatch workspace ${arg}`);

/**
 * @typedef {object} workspaces_params
 * @property {number} min_workspaces
 */

/** @param {workspaces_params} params */
const Workspaces = ({ min_workspaces }) => {
  /**
   * @param {number} i
   * @param {import("types/service/hyprland.js").Workspace[]} workspaces
   */
  const isVisible = (i, workspaces) => {
    const max_used = workspaces.reduce((acc, cur) => Math.max(acc, cur.id), 0);
    return i <= Math.max(min_workspaces, max_used);
  };

  return Widget.Box({
    vertical: true,
    children: range(10).map((i) => {
      return Widget.Button({
        class_name: "workspace",
        child: FontIcon({
          icon: icons.workspace,
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
        }).bind("min_workspaces", options.min_workspaces),
      }),
    }),
  });
