import AstalNotifd from "gi://AstalNotifd";

interface Props {
  notification: AstalNotifd.Notification;
}

export function Icon({ notification }: Props) {
  let icon: string;

  if (notification.image) {
    icon = notification.image;
  } else if (notification.appIcon) {
    icon = notification.appIcon;
  } else {
    icon = "dialog-information";
  }

  return <icon icon={icon} />;
}
