import { icons } from "lib/icons";
import { HoverRevealer } from "widgets/HoverRevealer";

const actions = {
  default: {
    className: "shutdown",
    icon: icons.power.shutdown,
    action: () => Utils.execAsync("shutdown -h now"),
  },
  hidden: {
    lock: {
      icon: icons.power.lock,
      // TODO: Implement lock screen
      action: () => console.log("lock"),
    },
    suspend: {
      icon: icons.power.suspend,
      action: () => Utils.execAsync("systemctl suspend"),
    },
    logout: {
      icon: icons.power.logout,
      action: () => Utils.execAsync("hyprctl dispatch exit"),
    },
    reboot: {
      icon: icons.power.reboot,
      action: () => Utils.execAsync("shutdown -r now"),
    },
  },
};

const setupIconBgPrimaryHook = (self: any) => {
  self.hook(options.bar.onlyPrimary, () => {
    self.toggleClassName("icon-bg-primary", options.bar.onlyPrimary.value);
  });
};

export function Powermenu() {
  return Widget.Box({
    className: "bar-module",
    child: HoverRevealer({
      hexpand: true,
      direction: "up",
      cursor: "pointer",
      className: "powermenu-revealer",
      indicator: Widget.Button({
        classNames: ["powermenu-button", actions.default.className],
        child: Widget.Icon({ icon: actions.default.icon, size: 20 }),
        onClicked: () => actions.default.action(),
        setup: setupIconBgPrimaryHook,
      }),
      child: Widget.Box({
        vertical: true,
        children: Object.entries(actions.hidden).map(
          ([name, { icon, action }]) =>
            Widget.Button({
              vpack: "center",
              className: `powermenu-button ${name}`,
              child: Widget.Icon({ icon, size: 20 }),
              onClicked: action,
              setup: setupIconBgPrimaryHook,
            }),
        ),
      }),
    }),
  });
}
