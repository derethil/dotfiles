import { icons } from "lib/icons";
import { range } from "lib/utils";
import { PanelModule } from "widgets/PanelModule";

const Hyprland = await Service.import("hyprland");

const swapToWorkspace = (arg: string | number) =>
  Utils.execAsync(`hyprctl dispatch workspace ${arg}`);

const Container = (hideAfter: number) => {
  return Widget.Box({
    vertical: true,
    hexpand: true,
    children: range(10).map((i) => {
      return Widget.Button({
        className: "workspace",
        child: Widget.Icon({
          icon: icons.workspace,
          size: options.theme.spacing.bind().as((s) => s * 2.25),
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
  return PanelModule({
    className: "workspaces",
    cursor: "pointer",
    onScrollUp: () => swapToWorkspace("e-1"),
    onScrollDown: () => swapToWorkspace("e+1"),
    child: options.bar.workspaces.minimum.bind().as(Container),
  });
}
