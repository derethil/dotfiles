import { ScreenshotDock } from "./ScreenshotDock";

type DockType = "screenshot";

const CurrentDockType = Variable<null | DockType>(null);

export const toggleToolDock = (dock?: DockType) => {
  if (!dock) return (CurrentDockType.value = null);
  CurrentDockType.value = CurrentDockType.value === dock ? null : dock;
};

export function ToolDock() {
  return Widget.Revealer({
    reveal_child: CurrentDockType.bind().as(Boolean),
    transitionDuration: options.transition.bind(),
    child: Widget.Box({
      className: "tool-dock dock-module",
      vertical: true,
      children: [
        Widget.Box({
          child: ScreenshotDock(),
          visible: CurrentDockType.bind().as((t) => t === "screenshot"),
        }),
      ],
    }),
  });
}
