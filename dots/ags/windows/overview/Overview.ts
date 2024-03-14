import { PopupWindow } from "widgets/PopupWindow";
import { Workspace } from "./Workspace";
import { options } from "options";
import { range } from "lib/utils";

const hyprland = await Service.import("hyprland");

const OverviewFn = (min: number) => {
  const ws = Math.max(min, Math.max(...hyprland.workspaces.map(({ id }) => id)));
  return Widget.Box({
    class_name: "overview horizontal",
    children:
      min > 0
        ? range(ws).map(Workspace)
        : hyprland.workspaces
            .filter(({ id }) => id > 0)
            .map(({ id }) => Workspace(id))
            .sort((a, b) => a.attribute.id - b.attribute.id),

    setup: (w) => {
      if (min > 0) return;

      w.hook(
        hyprland,
        (w, id?: string) => {
          if (id === undefined) return;

          w.children = w.children.filter((ch) => ch.attribute.id !== Number(id));
        },
        "workspace-removed",
      );
      w.hook(
        hyprland,
        (w, id?: string) => {
          if (id === undefined) return;

          w.children = [...w.children, Workspace(Number(id))].sort(
            (a, b) => a.attribute.id - b.attribute.id,
          );
        },
        "workspace-added",
      );
    },
  });
};

export function Overview() {
  return PopupWindow({
    name: "overview",
    layout: "center",
    child: options.overview.minWorkspaces.bind().as(OverviewFn),
  });
}
