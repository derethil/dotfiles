import { Gtk } from "astal/gtk3";
import { bash, notify } from "utils";
import { Action } from "./Action";

interface PowerAction {
  label: string;
  icon: string;
  activate: (button: Gtk.Widget) => void;
}

const PowerActions: PowerAction[] = [
  {
    label: "shutdown",
    icon: "system-shutdown-symbolic",
    activate: () => {
      bash("shutdown -h now").catch(console.error);
    },
  },
  {
    label: "reboot",
    icon: "system-reboot-symbolic",
    activate: () => {
      bash("shutdown -r now").catch(console.error);
    },
  },
  {
    label: "logout",
    icon: "application-exit-symbolic",
    activate: () => {
      bash("hyprctl dispatch exit").catch(console.error);
    },
  },
  {
    label: "suspend",
    icon: "system-suspend-symbolic",
    activate: () => {
      bash("systemctl suspend").catch(console.error);
    },
  },
  {
    label: "lock",
    icon: "system-lock-screen-symbolic",
    activate: () => {
      notify("Lock", {
        body: "Lock screen is not implemented yet lol",
      });
    },
  },
];

export function Wrapper() {
  return (
    <box className="powermenu">
      {PowerActions.map((action) => (
        <Action type={action.label} activate={action.activate}>
          <icon icon={action.icon} />
        </Action>
      ))}
    </box>
  );
}
