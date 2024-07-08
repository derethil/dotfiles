import { type Notification as NotificationType } from "types/service/notifications";
import GLib from "gi://GLib";
import { icons } from "lib/icons";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { Variable as VariableT } from "types/variable";

const formatTime = (time: number): string => {
  const datetime = GLib.DateTime.new_from_unix_local(time);
  const now = GLib.DateTime.new_now_local();
  const microseconds = now.difference(datetime);
  const minutes = microseconds / 1000000 / 60;

  if (minutes < 1) return "now";
  if (minutes < 60) return `${Math.floor(minutes)}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
};

const timeLabel = (time: number) => {
  return Variable(formatTime(time), {
    poll: [60000, async () => formatTime(time)],
  }).bind();
};

const NotificationIcon = ({ app_entry, app_icon, image }: NotificationType) => {
  if (image) {
    return Widget.Box({
      vpack: "start",
      hexpand: false,
      className: "icon img",
      css: `
                background-image: url("${image}");
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                min-width: 78px;
                min-height: 78px;
            `,
    });
  }

  let icon = icons.fallback.notification;
  if (Utils.lookUpIcon(app_icon)) {
    icon = app_icon;
  }

  if (Utils.lookUpIcon(app_entry || "")) {
    icon = app_entry || "";
  }

  return Widget.Box({
    vpack: "start",
    hexpand: false,
    className: "icon",
    css: `
            min-width: 78px;
            min-height: 78px;
        `,
    child: Widget.Icon({
      icon,
      size: 58,
      hpack: "center",
      hexpand: true,
      vpack: "center",
      vexpand: true,
    }),
  });
};

export function Notification(
  notification: NotificationType,
  remainingProgress: VariableT<number>,
) {
  const content = Widget.Box({
    className: "content",
    children: [
      NotificationIcon(notification),
      Widget.Box({
        hexpand: true,
        vertical: true,
        children: [
          Widget.Box({
            children: [
              Widget.Label({
                className: "title",
                xalign: 0,
                justification: "left",
                hexpand: true,
                maxWidthChars: 24,
                truncate: "end",
                wrap: true,
                label: notification.summary.trim(),
                useMarkup: true,
              }),
              Widget.Label({
                className: "time",
                vpack: "start",
                label: timeLabel(notification.time),
              }),
              Widget.Button({
                className: "close-button",
                vpack: "start",
                child: Widget.Icon("window-close-symbolic"),
                onClicked: notification.close,
              }),
            ],
          }),
          Widget.Label({
            className: "description",
            hexpand: true,
            useMarkup: true,
            xalign: 0,
            justification: "left",
            label: notification.body.trim(),
            maxWidthChars: 24,
            wrap: true,
          }),
        ],
      }),
    ],
  });

  const actionsbox = notification.actions.length > 0
    ? Widget.Revealer({
      transition: "slide_down",
      child: Widget.EventBox({
        child: Widget.Box({
          className: "actions horizontal",
          children: notification.actions.map((action) =>
            Widget.Button({
              className: "action-button",
              onClicked: () => notification.invoke(action.id),
              hexpand: true,
              child: Widget.Label(action.label),
            })
          ),
        }),
      }),
    })
    : null;

  const progressbar = notification.timeout > 0
    ? Widget.LevelBar({
      minValue: 0,
      maxValue: notification.timeout,
      value: remainingProgress.bind(),
    })
    : null;

  const eventbox = Widget.EventBox({
    vexpand: false,
    onPrimaryClick: notification.dismiss,
    onHover() {
      if (actionsbox) actionsbox.reveal_child = true;
    },
    onHoverLost: () => {
      if (actionsbox) actionsbox.reveal_child = true;
    },
    child: Widget.Box({
      vertical: true,
      children: [content, actionsbox, progressbar].filter((x) =>
        x !== null
      ) as Gtk.Widget[],
    }),
  });

  return Widget.Box({
    className: `notification ${notification.urgency}`,
    child: eventbox,
  });
}
