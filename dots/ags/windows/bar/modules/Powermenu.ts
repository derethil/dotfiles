import { icons } from "lib/icons";
import { FontIcon } from "widgets/FontIcon";
import { HoverRevealer } from "widgets/HoverRevealer";
import { PanelModule } from "widgets/PanelModule";

const actions = {
  default: {
    className: "shutdown",
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

export function Powermenu() {
  return PanelModule({
    className: "powermenu",
    child: HoverRevealer({
      hexpand: true,
      direction: "up",
      cursor: "pointer",
      className: "powermenu-revealer",
      indicator: Widget.Button({
        classNames: ["powermenu-button", actions.default.className],
        child: FontIcon({ label: actions.default.icon }),
        onClicked: () => actions.default.action(),
      }),
      child: Widget.Box({
        vertical: true,
        children: Object.entries(actions.hidden).map(
          ([name, { icon, action }]) =>
            Widget.Button({
              vpack: "center",
              className: `powermenu-button ${name}`,
              child: FontIcon({ label: icon }),
              onClicked: action,
            })
        ),
      }),
    }),
  });
}
