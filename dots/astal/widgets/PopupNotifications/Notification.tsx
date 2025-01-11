import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import AstalNotifd from "gi://AstalNotifd";
import { CircleProgress, Revealer } from "elements";
import { options } from "options";
import { Icon } from "./Icon";

interface Props {
  notification: AstalNotifd.Notification;
}

function getUrgencyColor(urgency: AstalNotifd.Urgency) {
  switch (urgency) {
    case AstalNotifd.Urgency.LOW:
      return options.theme.color.status.success.default.get();
    case AstalNotifd.Urgency.NORMAL:
      return options.theme.color.status.warning.default.get();
    case AstalNotifd.Urgency.CRITICAL:
      return options.theme.color.status.critical.default.get();
  }
}

function bodyText(body: string) {
  if (body.length <= 60) {
    return body;
  }
  return `${body.substring(0, 60)}...`;
}

export function Notification({ notification }: Props) {
  const reveal = Variable(true);
  const expires = notification.expireTimeout > 0;
  const timeout = expires ? notification.expireTimeout : 5000;

  const handleClick = () => {
    reveal.set(false);
    setTimeout(() => notification.dismiss(), options.theme.transition.get());
  };

  setTimeout(() => {
    reveal.set(false);
  }, timeout - options.theme.transition.get());

  return (
    <Revealer
      revealChild={reveal()}
      transitionDuration={options.theme.transition()}
    >
      <button
        className="notification"
        onClick={handleClick}
        onDestroy={() => reveal.drop()}
        cursor="pointer"
      >
        <box widthRequest={600}>
          <Icon notification={notification} />
          <box className="text" vertical valign={Gtk.Align.CENTER} hexpand>
            <label
              className="summary"
              label={notification.summary}
              halign={Gtk.Align.START}
            />
            <label
              className="body"
              label={bodyText(notification.body)}
              halign={Gtk.Align.START}
            />
          </box>
          <CircleProgress
            value={1}
            size={10}
            linear
            color={getUrgencyColor(notification.urgency)}
            asTimeout
            animationDuration={timeout}
          />
        </box>
      </button>
    </Revealer>
  );
}
