import { type Notification as NotificationType } from "types/service/notifications";
import GLib from "gi://GLib";
import { icons } from "lib/icons";

const time = (time: number, format = "%H:%M") =>
  GLib.DateTime
    .new_from_unix_local(time)
    .format(format);

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

export function Notification(notification: NotificationType) {
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
                label: time(notification.time),
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

  const eventbox = Widget.EventBox({
    vexpand: false,
    onPrimaryClick: notification.dismiss,
    onHover() {
      if (actionsbox) {
        actionsbox.reveal_child = true;
      }
    },
    onHoverLost() {
      if (actionsbox) {
        actionsbox.reveal_child = true;
      }

      notification.dismiss();
    },
    child: Widget.Box({
      vertical: true,
      children: actionsbox ? [content, actionsbox] : [content],
    }),
  });

  return Widget.Box({
    className: `notification ${notification.urgency}`,
    child: eventbox,
  });
}
