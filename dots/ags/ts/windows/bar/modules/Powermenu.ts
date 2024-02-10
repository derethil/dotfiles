import Utils from "resource:///com/github/Aylur/ags/utils.js";
import Widget, { EventBox } from "resource:///com/github/Aylur/ags/widget.js";

import icons from "ts/icons.js";
import FontIcon from "ts/widgets/FontIcon.js";
import HoverRevealer from "ts/widgets/HoverRevealer.js";

const actions = {
  default: {
    class_name: "shutdown",
    icon: icons.powermenu.shutdown,
    action: () => Utils.execAsync("shutdown -h now"),
  },
  hidden: {
    lock: {
      icon: icons.powermenu.lock,
      // TODO: Implement lock screen
      action: () => console.log("lock"),
    },
    suspend: {
      icon: icons.powermenu.suspend,
      action: () => Utils.execAsync("systemctl suspend"),
    },
    logout: {
      icon: icons.powermenu.logout,
      action: () => Utils.execAsync("hyprctl dispatch exit"),
    },
    reboot: {
      icon: icons.powermenu.reboot,
      action: () => Utils.execAsync("shutdown -r now"),
    },
  },
};

export default () =>
  EventBox({
    class_name: "panel-button powermenu",
    child: Widget.Box({
      vpack: "center",
      vertical: true,
      child: HoverRevealer({
        direction: "up",
        cursor: "pointer",
        class_name: "powermenu-revealer",
        indicator: Widget.Button({
          class_name: `powermenu-button ${actions.default.class_name}`,
          child: FontIcon({ icon: actions.default.icon }),
          on_clicked: actions.default.action,
        }),
        child: Widget.Box({
          vertical: true,
          children: Object.entries(actions.hidden).map(
            ([name, { icon, action }]) =>
              Widget.Button({
                vpack: "center",
                class_name: `powermenu-button ${name}`,
                child: FontIcon({ icon }),
                on_clicked: action,
              })
          ),
        }),
      }),
    }),
  });
