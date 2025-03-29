import { Variable } from "astal";
import { Gdk, Gtk } from "astal/gtk3";
import AstalNotifd from "gi://AstalNotifd";
import { CircleProgress, Revealer } from "elements";
import { options } from "options";
import { createClickHandler } from "utils/binds";
import { Icon } from "./Icon";
import { bodyText, formatTime, getUrgencyColor, processTime } from "./util";

interface Props {
  notification: AstalNotifd.Notification;
}

export function Notification(props: Props) {
  const { notification } = props;

  const [timeout, msLeft, startValue] = processTime(notification, 8000);
  if (timeout === null) return <></>;

  const reveal = Variable(true);

  const handleDimiss = () => {
    reveal.set(false);
    setTimeout(() => notification.dismiss(), options.theme.transition.get());
  };

  const handleFinished = (value: number) => {
    // TODO: Once a notification history widget is implemented, this should not dismiss the notification
    if (value > 0 || !reveal) return;
    handleDimiss();
  };

  const handleInvoke = () => {
    const primaryAction = notification.actions[0] ?? null;
    if (primaryAction) notification.invoke(primaryAction.id);
    handleDimiss();
  };

  return (
    <Revealer revealChild={reveal()} transitionDuration={options.theme.transition()}>
      <button
        className="notification"
        onClick={createClickHandler(
          {
            key: Gdk.BUTTON_PRIMARY,
            action: handleInvoke,
          },
          {
            key: Gdk.BUTTON_SECONDARY,
            action: handleDimiss,
          },
        )}
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
