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

export function processTime(notification: AstalNotifd.Notification) {
  const expires = notification.expireTimeout > 0;
  const timeout = expires ? notification.expireTimeout : 5000;

  const endTime = notification.time * 1000 + timeout;
  const msLeft = endTime - Date.now();
  const startValue = msLeft / timeout;

  if (msLeft <= 0) return [null, null, null] as const;

  return [timeout, msLeft, startValue] as const;
}
