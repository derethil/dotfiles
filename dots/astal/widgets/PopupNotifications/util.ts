import { GLib } from "astal";
import AstalNotifd from "gi://AstalNotifd?version=0.1";
import { options } from "options";

export function getUrgencyColor(urgency: AstalNotifd.Urgency) {
  switch (urgency) {
    case AstalNotifd.Urgency.LOW:
      return options.theme.color.status.success.default.get();
    case AstalNotifd.Urgency.NORMAL:
      return options.theme.color.status.warning.default.get();
    case AstalNotifd.Urgency.CRITICAL:
      return options.theme.color.status.critical.default.get();
  }
}

export function bodyText(body: string) {
  if (body.length <= 60) return body;
  return `${body.substring(0, 60)}...`;
}

export function processTime(
  notification: AstalNotifd.Notification,
  defaultTimeout: Milliseconds = 5000,
) {
  const expires = notification.expireTimeout > 0;
  const timeout = expires ? notification.expireTimeout : defaultTimeout;

  const endTime = notification.time * 1000 + timeout;
  const msLeft = endTime - Date.now();
  const startValue = msLeft / timeout;

  if (msLeft <= 0) return [null, null, null] as const;

  return [timeout, msLeft, startValue] as const;
}

export const formatTime = (time: number): string => {
  const datetime = GLib.DateTime.new_from_unix_local(time);
  const now = GLib.DateTime.new_now_local();
  const microseconds = now.difference(datetime);
  const minutes = microseconds / 1000000 / 60;

  if (minutes < 1) return "now";
  if (minutes < 60) return `${Math.floor(minutes)}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
};
