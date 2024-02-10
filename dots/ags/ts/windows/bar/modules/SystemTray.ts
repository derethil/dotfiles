import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import SystemTray from "resource:///com/github/Aylur/ags/service/systemtray.js";
import { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";

import PanelButton from "../PanelButton.js";
import FontIcon from "ts/widgets/FontIcon.js";
import options from "ts/options.js";
import icons from "ts/icons.js";

function SystemTrayItem(item: TrayItem) {
  return Widget.Button({
    class_name: "tray-item",
    child: Widget.Icon().bind("icon", item, "icon"),
    on_primary_click: (_, event) => {
      item.activate(event);
    },
    on_secondary_click: (_, event) => item.openMenu(event),
  });
}

const excludeSet = new Set(options.tray.exclude.value);
function filterItems(item: TrayItem) {
  return !excludeSet.has(item.title);
}

export default () =>
  Widget.Revealer({
    reveal_child: false,
    transition_duration: options.transition.value,
    transition: "slide_up",
    class_name: "system-tray",
    setup: (self) => {
      self.hook(SystemTray, (self) => {
        if (options.tray.disable.value) return;
        if (SystemTray.items.filter(filterItems).length > 0) {
          self.reveal_child = true;
        } else {
          self.reveal_child = false;
        }
      });
    },
    child: PanelButton({
      class_name: "system-tray",
      icon: options.tray.showModuleIcon.value
        ? FontIcon({ icon: icons.tray })
        : null,
      color: "green",
      content: Widget.Box({
        vertical: true,
      }).bind("children", SystemTray, "items", (i) =>
        i.filter(filterItems).map(SystemTrayItem)
      ),
    }),
  });
