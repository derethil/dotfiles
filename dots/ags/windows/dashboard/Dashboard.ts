import { PopupWindow } from "widgets/PopupWindow";
import { ToolsBar } from "./modules/ToolsBar";
import { AudioManager } from "./modules/AudioManager";

export function Dashboard() {
  return PopupWindow({
    name: "dashboard",
    layout: "center",
    transition: "slide_up",
    child: Widget.Box({
      css: "min-width: 800px; min-height: 300px;",
      vertical: true,
      vpack: "start",
      hexpand: true,
      children: [ToolsBar(), AudioManager()],
    }),
  });
}
