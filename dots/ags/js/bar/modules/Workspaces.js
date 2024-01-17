import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import options from "../../options.js";
import FontIcon from "../../misc/FontIcon.js";
import icons from "../..//icons.js";
import { range } from "../..//utils.js";

/** @param {any} arg */
const dispatch = (arg) => Utils.execAsync(`hyprctl dispatch workspace ${arg}`);

const Workspaces = () => {
  const num_workspaces = options.workspaces.value;

  return Widget.Box({
    vertical: true,
    children: range(num_workspaces).map((i) => {
      return Widget.Button({
        class_name: "workspace",
        child: FontIcon({
          icon: icons.workspace,
          class_name: "indicator",
        }),
        on_clicked: () => dispatch(i),
        setup: (self) =>
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
          }),
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
        child: Workspaces(),
      }),
    }),
  });
