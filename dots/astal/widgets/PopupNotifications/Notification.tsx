import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import AstalNotifd from "gi://AstalNotifd";
import { CircleProgress, Revealer } from "elements";
import { options } from "options";
import { Icon } from "./Icon";
import { bodyText, formatTime, getUrgencyColor, processTime } from "./util";

interface Props {
  notification: AstalNotifd.Notification;
}

export function Notification({ notification }: Props) {
  const [timeout, msLeft, startValue] = processTime(notification, 8000);
  if (timeout === null) return <></>;

  const reveal = Variable(true);

  const handleDismiss = () => {
    reveal.set(false);
    setTimeout(() => notification.dismiss(), options.theme.transition.get());
  };

  const handleFinished = (value: number) => {
    // TODO: Once a notification history widget is implemented, this should not dismiss the notification
    if (value > 0 || !reveal) return;
    handleDismiss();
  };

  return (
    <Revealer revealChild={reveal()} transitionDuration={options.theme.transition()}>
      <button
        className="notification"
        onClick={handleDismiss}
        onDestroy={() => reveal.drop()}
        cursor="pointer"
      >
        <box widthRequest={600}>
          <Icon notification={notification} />
          <box className="text" vertical valign={Gtk.Align.CENTER} hexpand>
            <box>
              <label
                hexpand
                className="summary"
                label={notification.summary}
                halign={Gtk.Align.START}
              />
              <label
                className="time"
                label={formatTime(notification.time)}
                halign={Gtk.Align.END}
              />
            </box>
            <label
              className="body"
              label={bodyText(notification.body)}
              halign={Gtk.Align.START}
            />
          </box>
          <CircleProgress
            value={startValue}
            onChange={handleFinished}
            size={10}
            linear
            color={getUrgencyColor(notification.urgency)}
            asTimeout
            animationDuration={msLeft}
          />
        </box>
      </button>
    </Revealer>
  );
}
