const SystemTrayService = await Service.import("systemtray");
import { type TrayItem } from "types/service/systemtray";
import { PanelButton } from "../../../widgets/PanelButton";
import Gdk from "gi://Gdk";

function SystemTrayItem(item: TrayItem) {
  return Widget.Button({
    className: "tray-item",
    child: Widget.Icon().bind("icon", item, "icon"),
    onClicked: (btn) =>
      item.menu?.popup_at_widget(btn, Gdk.Gravity.EAST, Gdk.Gravity.WEST, null),
    onSecondaryClick: (btn) =>
      item.menu?.popup_at_widget(btn, Gdk.Gravity.EAST, Gdk.Gravity.WEST, null),
  });
}

function filterItems(item: TrayItem) {
  const excludeSet = new Set(options.bar.tray.hidden.value);
  return !excludeSet.has(item.title);
}

export function SystemTray() {
  return Widget.Revealer({
    revealChild: false,
    transitionDuration: options.transition.bind(),
    transition: "slide_up",
    className: "system-tray",
    setup: (self) => {
      self.hook(SystemTrayService, (self) => {
        if (SystemTrayService.items.filter(filterItems).length > 0) {
          self.reveal_child = true;
        } else {
          self.reveal_child = false;
        }
      });
    },
    child: PanelButton({
      className: "system-tray",
      child: Widget.Box({
        hexpand: true,
        vertical: true,
      }).bind("children", SystemTrayService, "items", (i) =>
        i.filter(filterItems).map(SystemTrayItem)
      ),
    }),
  });
}
