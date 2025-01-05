import { Gtk } from "astal/gtk3";
import { bash, notify } from "utils";

export interface PowerAction {
  label: string;
  className: string;
  icon: string;
  activate: (button: Gtk.Widget) => void | Promise<void>;
}

export const PowerActions: PowerAction[] = [
  {
    label: "Shut Down",
    className: "shutdown",
    icon: "system-shutdown-symbolic",
    activate: () => {
      bash("shutdown -h now").catch(console.error);
    },
  },
  {
    label: "Reboot",
    className: "reboot",
    icon: "system-reboot-symbolic",
    activate: () => {
      bash("shutdown -r now").catch(console.error);
    },
  },
  {
    label: "Log Out",
    className: "logout",
    icon: "application-exit-symbolic",
    activate: () => {
      bash("hyprctl dispatch exit").catch(console.error);
    },
  },
  {
    label: "Suspend",
    className: "suspend",
    icon: "system-suspend-symbolic",
    activate: () => {
      bash("systemctl suspend").catch(console.error);
    },
  },
  {
    label: "Lock",
    className: "lock",
    icon: "system-lock-screen-symbolic",
    activate: () => {
      notify("Lock", {
        body: "Lock screen is not implemented yet lol",
      });
    },
  },
];
