import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import icons from "../../icons.js";
import PanelButton from "../PanelButton.js";
import FontIcon from "../../misc/FontIcon.js";
import HoverRevealer from "../../misc/HoverRevealer.js";

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
  Widget.EventBox({
    class_name: "powermenu",
    hpack: "center",
    cursor: "pointer",
    child: HoverRevealer({
      direction: "up",
      class_name: "powermenu-revealer",
      indicator: PanelButton({
        class_name: `powermenu-button ${actions.default.class_name}`,
        content: FontIcon(actions.default.icon),
        on_clicked: actions.default.action,
      }),
      child: Widget.Box({
        vertical: true,
        children: Object.entries(actions.hidden).map(
          ([name, { icon, action }]) =>
            PanelButton({
              class_name: `powermenu-button ${name}`,
              content: FontIcon(icon),
              on_clicked: action,
            })
        ),
      }),
    }),
  });
