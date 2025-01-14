import { bind, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { FloatingWindow } from "elements";
import { Notification } from "./Notification";

export function PopupNotifications(monitor: Gdk.Monitor) {
  const notifd = Notifd.get_default();

  notifd.get_notifications().forEach((n) => n.dismiss());

  const notifications = Variable.derive(
    [bind(notifd, "notifications"), bind(notifd, "dontDisturb")],
    (ns, dnd) => {
      if (dnd) return ns.filter((n) => n.urgency === Notifd.Urgency.CRITICAL);
      return ns;
    },
  );

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
        {notifications((notifications) =>
          notifications.reverse().map((n) => <Notification notification={n} />),
        )}
      </box>
    </FloatingWindow>
  );
}
