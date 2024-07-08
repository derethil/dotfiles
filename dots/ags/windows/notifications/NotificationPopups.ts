import GLib from "types/@girs/glib-2.0/glib-2.0";
import { Notification } from "./Notification";
import { Variable as VariableT } from "types/variable";

const notifications = await Service.import("notifications");

const { transition } = options;

function Animated(id: number) {
  const n = notifications.getNotification(id)!;

  let progressSource: null | GLib.Source = null;
  const remainingProgress = Variable(n.timeout);

  const widget = Notification(n, remainingProgress);

  const inner = Widget.Revealer({
    transition: "slide_left",
    transitionDuration: transition.value,
    child: widget,
  });

  const outer = Widget.Revealer({
    transition: "slide_down",
    transitionDuration: transition.value,
    child: inner,
  });

  const box = Widget.Box({
    hpack: "end",
    child: outer,
  });

  const createProgress = () =>
    setInterval(() => {
      if (remainingProgress.value > 0) {
        remainingProgress.value -= 10;
      } else {
        progressSource?.destroy();
      }
    }, 10);

  Utils.idle(() => {
    outer.reveal_child = true;
    Utils.timeout(transition.value, () => {
      inner.reveal_child = true;
      if (n.timeout === 0) return;
      progressSource = createProgress();
    });
  });

  return Object.assign(box, {
    dismiss() {
      inner.reveal_child = false;
      Utils.timeout(transition.value, () => {
        outer.reveal_child = false;
        Utils.timeout(transition.value, () => {
          box.destroy();
          progressSource?.destroy();
        });
      });
    },
  });
}

function PopupList() {
  const map: Map<number, ReturnType<typeof Animated>> = new Map();
  const box = Widget.Box({
    hpack: "end",
    vertical: true,
    css: options.notifications.width.bind().as((w) => `min-width: ${w}px;`),
  });

  function remove(_: unknown, id: number) {
    map.get(id)?.dismiss();
    map.delete(id);
  }

  return box
    .hook(notifications, (_, id: number) => {
      if (id !== undefined) {
        if (map.has(id)) {
          remove(null, id);
        }

        if (notifications.dnd) {
          return;
        }

        const w = Animated(id);
        map.set(id, w);
        box.children = [w, ...box.children];
      }
    }, "notified")
    .hook(notifications, remove, "dismissed")
    .hook(notifications, remove, "closed");
}

export function NotificationPopup(monitor: number) {
  return Widget.Window({
    name: `notifications${monitor}`,
    className: "notifications",
    anchor: options.notifications.position.bind(),
    child: Widget.Box({
      css: "padding: 2px;",
      child: PopupList(),
    }),
  });
}
