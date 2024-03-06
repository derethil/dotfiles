import { PopupWindow } from "widgets/PopupWindow";
import { ToolsBar } from "./modules/ToolsBar";
import { AudioManager } from "./modules/AudioManager";

export function Dashboard() {
  return PopupWindow({
    name: "dashboard",
    setup: (self: any) =>
      self.hook(options.bar.position, () => {
        self.anchor = ["top", options.bar.position.value];
        self.transition =
          options.bar.position.value === "left" ? "slide_right" : "slide_left";
      }),
    child: Widget.Box({
      className: "dashboard",
      vertical: true,
      vpack: "start",
      hexpand: true,
      children: [ToolsBar(), AudioManager()],
    }),
  });
}
