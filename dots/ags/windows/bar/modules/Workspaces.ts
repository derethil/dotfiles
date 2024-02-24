const Hyprland = await Service.import("hyprland");
import FontIcon from "widgets/FontIcon";
import icons from "lib/icons";
import { range } from "lib/utils";
import { Workspace } from "types/service/hyprland";
import PanelModule from "widgets/PanelModule";

const dispatch = (arg: any) =>
  Utils.execAsync(`hyprctl dispatch workspace ${arg}`);

const Workspaces = ({ minimum }: { minimum: number }) => {
  const isVisible = (i: number, workspaces: Workspace[]) => {
    const max_used = workspaces.reduce((acc, cur) => Math.max(acc, cur.id), 0);
    return i <= Math.max(minimum, max_used);
  };

  return Widget.Box({
    vertical: true,
    hexpand: true,
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
  PanelModule({
    class_name: "workspaces",
    cursor: "pointer",
    on_scroll_up: () => dispatch("e-1"),
    on_scroll_down: () => dispatch("e+1"),
    child: Workspaces({
      minimum: options.bar.workspaces.minimum.value,
      // @ts-expect-error - .bind() is not typed to accept custom properties
    }).bind("minimum", options.bar.workspaces.minimum),
  });
