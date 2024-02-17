import PopupWindow from "ts/widgets/PopupWindow";
import ToolsBar from "./modules/ToolsBar";

export default () =>
  PopupWindow({
    name: "dashboard",
    class_name: "dashboard",
    setup: (self: any) =>
      self.hook(options.bar.position, () => {
        self.anchor = ["top", options.bar.position.value];
        self.transition =
          options.bar.position.value === "left" ? "slide_right" : "slide_left";
      }),
    child: Widget.Box({
      vertical: true,
      vpack: "start",
      hexpand: true,
      children: [ToolsBar()],
    }),
  });
