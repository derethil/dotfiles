import Gdk from "gi://Gdk";
import { type TrayItem } from "types/service/systemtray";
import { PanelButton } from "../../../widgets/PanelButton";

const SystemTrayService = await Service.import("systemtray");

function SystemTrayItem(item: TrayItem) {
  return Widget.Button({
    className: "tray-item",
    child: Widget.Icon({ icon: item.bind("icon") }),
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
    className: "system-tray",
    child: PanelButton({
      className: "system-tray",
      child: Widget.Box({
        hexpand: true,
        vertical: true,
        children: SystemTrayService.bind("items").as((items) =>
          items.filter(filterItems).map(SystemTrayItem)
        ),
      }),
    }),
  });
}
