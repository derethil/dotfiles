import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { FloatingWindow } from "elements";
import { Notification } from "./Notification";

export function PopupNotifications(monitor: Gdk.Monitor) {
  const notifd = Notifd.get_default();

  return (
    <FloatingWindow
      visible
      application={App}
      name="PopupNotifications"
      className="PopupNotifications"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.TOP}
    >
      <box halign={Gtk.Align.CENTER} vertical>
        {bind(notifd, "notifications").as((notifications) =>
          notifications.reverse().map((n) => <Notification notification={n} />),
        )}
      </box>
    </FloatingWindow>
  );
}
