import { icons } from "lib/icons";
import { range } from "lib/utils";
import { PanelModule } from "widgets/PanelModule";

const Hyprland = await Service.import("hyprland");

const swapToWorkspace = (arg: string | number) =>
  Utils.execAsync(`hyprctl dispatch workspace ${arg}`);

const Container = (hideAfter: number) => {
  return Widget.Box({
    className: "bar-module",
    vertical: true,
    hexpand: true,
    children: range(10).map((i) => {
      return Widget.Button({
        hpack: "center",
        className: "workspace",
        child: Widget.Icon({
          icon: icons.ui.dot,
          size: options.bar.workspaces.iconSize.bind(),
          className: "indicator",
        }),
        onClicked: () => swapToWorkspace(i),
        visible: Hyprland.bind("workspaces").as((workspaces) => {
          return i <= Math.max(hideAfter, ...workspaces.map((w) => w.id));
        }),
        setup: (self) => {
          self.hook(Hyprland, () => {
            const windows = Hyprland.getWorkspace(i)?.windows || 0;
            self.toggleClassName("active", Hyprland.active.workspace.id === i);
            self.toggleClassName("occupied", windows > 0);
            self.toggleClassName("empty", windows === 0);
          });
        },
      });
    }),
  });
};

export function Workspaces() {
  return Widget.EventBox({
    className: "workspaces",
    cursor: "pointer",
    onScrollUp: () => swapToWorkspace("m-1"),
    onScrollDown: () => swapToWorkspace("m+1"),
    child: options.bar.workspaces.minimum.bind().as(Container),
  });
}
