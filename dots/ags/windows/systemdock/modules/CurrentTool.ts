import { ScreenshotDock } from "./ScreenshotDock";

type DockType = "screenshot";

export const CurrentToolStr = Variable<null | DockType>("screenshot");

export const toggleCurrentTool = (dock?: DockType) => {
  if (!dock) return (CurrentToolStr.value = null);
  CurrentToolStr.value = CurrentToolStr.value === dock ? null : dock;
};

export function CurrentTool() {
  return Widget.Revealer({
    reveal_child: CurrentToolStr.bind().as(Boolean),
    transitionDuration: options.transition.bind(),
    child: Widget.Box({
      hpack: "center",
      vpack: "start",
      className: "tool-container",
      children: [
        Widget.Box({
          child: ScreenshotDock(),
          visible: CurrentToolStr.bind().as((t) => t === "screenshot"),
        }),
      ],
    }),
  });
}
