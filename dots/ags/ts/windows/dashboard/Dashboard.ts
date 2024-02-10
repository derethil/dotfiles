import { Label, Widget } from "resource:///com/github/Aylur/ags/widget.js";
import options from "ts/options";
import PopupWindow, {
  PopupWindow as PopupWindowClass,
  PopupWindowProps,
} from "ts/widgets/PopupWindow";

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
      child: Label({
        label: "Dashboard",
      }),
    }),
  });
