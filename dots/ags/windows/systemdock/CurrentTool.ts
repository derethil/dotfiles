import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { Audio } from "./tools/Audio";
import { Screenshots } from "./tools/Screenshots";

type Tool = "screenshot" | "audio";

export const CurrentToolStr = Variable<null | Tool>(null);

export const toggleCurrentTool = (dock?: Tool) => {
  if (!dock) return (CurrentToolStr.value = null);
  CurrentToolStr.value = CurrentToolStr.value === dock ? null : dock;
};

const ToolsFactory = (tools: Record<Tool, () => Gtk.Widget>) =>
  Object.entries(tools).map(([type, widget]) =>
    Widget.Box({
      child: widget(),
      visible: CurrentToolStr.bind().as((t) => t === type),
    })
  );

export function CurrentTool() {
  return Widget.Revealer({
    reveal_child: CurrentToolStr.bind().as(Boolean),
    transitionDuration: options.transition.bind(),
    child: Widget.Box({
      hpack: "center",
      vpack: "start",
      className: "tool-container",
      children: ToolsFactory({
        audio: Audio,
        screenshot: Screenshots,
      }),
    }),
  });
}
