import Gdk from "gi://Gdk";
import { type TrayItem } from "types/service/systemtray";

const SystemTrayService = await Service.import("systemtray");

function SystemTrayItem(item: TrayItem) {
  return Widget.Button({
    hpack: "center",
    child: Widget.Icon({ icon: item.bind("icon") }),
    tooltipMarkup: item.bind("tooltip_markup"),
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
    revealChild: SystemTrayService.bind("items").as((items) =>
      items.filter(filterItems).length > 0
    ),
    transitionDuration: options.transition.bind(),
    transition: "slide_up",
    child: Widget.Box({
      className: "bar-module system-tray",
      hexpand: true,
      vertical: true,
      children: SystemTrayService.bind("items").as((items) =>
        items.filter(filterItems).map(SystemTrayItem)
      ),
    }),
  });
}
