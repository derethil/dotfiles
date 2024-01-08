import Widget from "resource:///com/github/Aylur/ags/widget.js";
import icons from "../../icons.js";
import PanelButton from "../PanelButton.js";
import FontIcon from "../../misc/FontIcon.js";
import HoverRevealer from "../../misc/HoverRevealer.js";

const actions = {
  default: {
    class_name: "shutdown",
    icon: icons.powermenu.shutdown,
    action: () => console.log("shutdown"),
  },
  hidden: {
    lock: {
      icon: icons.powermenu.lock,
      action: () => console.log("lock"),
    },
    logout: {
      icon: icons.powermenu.logout,
      action: () => console.log("logout"),
    },
    suspend: {
      icon: icons.powermenu.suspend,
      action: () => console.log("suspend"),
    },
    reboot: {
      icon: icons.powermenu.reboot,
      action: () => console.log("reboot"),
    },
  },
};

export default () =>
  Widget.EventBox({
    class_name: "powermenu",
    hpack: "center",
    child: HoverRevealer({
      direction: "up",
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
