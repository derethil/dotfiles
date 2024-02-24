const SystemTray = await Service.import("systemtray");
import { type TrayItem } from "types/service/systemtray";
import PanelButton from "../../../widgets/PanelButton";
import Gdk from "gi://Gdk";

function SystemTrayItem(item: TrayItem) {
  return Widget.Button({
    class_name: "tray-item",
    child: Widget.Icon().bind("icon", item, "icon"),
    on_clicked: (btn) =>
      item.menu?.popup_at_widget(btn, Gdk.Gravity.EAST, Gdk.Gravity.WEST, null),
    on_secondary_click: (btn) =>
      item.menu?.popup_at_widget(btn, Gdk.Gravity.EAST, Gdk.Gravity.WEST, null),
  });
}

function filterItems(item: TrayItem) {
  const excludeSet = new Set(options.bar.tray.hidden.value);
  return !excludeSet.has(item.title);
}

export default () =>
  Widget.Revealer({
    reveal_child: false,
    transition_duration: options.transition.bind(),
    transition: "slide_up",
    class_name: "system-tray",
    setup: (self) => {
      self.hook(SystemTray, (self) => {
        if (SystemTray.items.filter(filterItems).length > 0) {
          self.reveal_child = true;
        } else {
          self.reveal_child = false;
        }
      });
    },
    child: PanelButton({
      class_name: "system-tray",
      child: Widget.Box({
        hexpand: true,
        vertical: true,
      }).bind("children", SystemTray, "items", (i) =>
        i.filter(filterItems).map(SystemTrayItem)
      ),
    }),
  });
