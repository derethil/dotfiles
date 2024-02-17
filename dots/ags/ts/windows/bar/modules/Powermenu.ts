import icons from "ts/icons.js";
import FontIcon from "ts/widgets/FontIcon.js";
import HoverRevealer from "ts/widgets/HoverRevealer.js";
import PanelModule from "ts/widgets/PanelModule";

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
  PanelModule({
    class_name: "powermenu",
    child: HoverRevealer({
      hexpand: true,
      direction: "up",
      cursor: "pointer",
      class_name: "powermenu-revealer",
      indicator: Widget.Button({
        class_name: "powermenu-button",
        child: FontIcon({ label: actions.default.icon }),
      }),
      child: Widget.Box({
        vertical: true,
        children: Object.entries(actions.hidden).map(
          ([name, { icon, action }]) =>
            Widget.Button({
              vpack: "center",
              class_name: `powermenu-button ${name}`,
              child: FontIcon({ label: icon }),
              on_clicked: action,
            })
        ),
      }),
    }),
  });
