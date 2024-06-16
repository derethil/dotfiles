import { type NudgeState, NudgeTimer } from "services/nudgetimer";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { PopupWindow } from "windows/PopupWindow";

const snooze = (until?: number) => {
  App.toggleWindow("eyenudge");
  NudgeTimer.waitForNudge(until);
};

const disableForToday = () => {
  const now = new Date();
  const reenableAt = new Date(now);
  reenableAt.setDate(now.getDate() + 1);
  reenableAt.setHours(8);
  const disableDuration = reenableAt.getTime() - now.getTime();
  snooze(disableDuration);
};

function formatSeconds(seconds: number): string {
  if (seconds < 60) {
    const padding = seconds < 10 ? " " : "";
    return `${padding}${seconds.toFixed(2)}s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const padding = remainingSeconds < 10 ? " " : "";
    return `${minutes}m ${padding}${remainingSeconds.toFixed(0)}s`;
  }
}

const NudgeRemaining = () => {
  return Widget.Label({
    vexpand: true,
    className: "nudge-remaining",
    label: NudgeTimer.bind("nudge_remaining").as((remaining) => {
      const seconds = remaining / 1000;
      if (seconds >= options.eyenudge.interval.value) return "Paused";
      return formatSeconds(seconds);
    }),
  });
};

const Actions = (nudgeState: NudgeState) => {
  const statefulActions: Partial<Record<NudgeState, Gtk.Widget[]>> = {
    pending: [
      Widget.Button({
        label: "Start",
        onPrimaryClick: () => NudgeTimer.startNudge(),
      }),
    ],
    paused: [
      Widget.Button({
        label: "Resume",
        onPrimaryClick: () => NudgeTimer.startNudge(),
      }),
    ],
    running: [
      Widget.Button({
        label: "Pause",
        onPrimaryClick: () => NudgeTimer.pauseNudge(),
      }),
    ],
  };

  return [
    ...statefulActions[nudgeState] ?? [],
    Widget.Button({
      label: "5m",
      onPrimaryClick: () => snooze(300),
    }),
    Widget.Button({
      label: "20m",
      onPrimaryClick: () => snooze(),
    }),
  ];
};

const Title = (nudgeState: NudgeState) => {
  const Titles: Record<NudgeState, string> = {
    pending: "Eye Nudge - Ready",
    running: "Eye Nudge - Look Away",
    paused: "Eye Nudge - Paused",
    waiting: "Eye Nudge - Waiting",
  };

  return Titles[nudgeState] ?? "Eye Nudge";
};

const Content = () => {
  return Widget.Box({
    css: "min-width: 500px; min-height: 300px;",
    vertical: true,
    vpack: "fill",
    hexpand: true,
    children: [
      Widget.Label({
        className: "nudge-title",
        label: NudgeTimer.bind("nudge_state").as(Title),
      }),
      Widget.Separator(),
      NudgeRemaining(),
      Widget.Separator(),
      Widget.Box({
        className: "actions",
        hexpand: true,
        hpack: "center",
        children: NudgeTimer.bind("nudge_state").as(Actions),
      }),
      Widget.Box({
        className: "footer",
        hexpand: true,
        hpack: "center",
        child: Widget.Button({
          label: "Disable for today",
          onPrimaryClick: disableForToday,
        }),
      }),
    ],
  });
};

export const EyeNudge = () => {
  return PopupWindow({
    name: "eyenudge",
    layout: "center",
    transition: "slide_up",
    locked: true,
    child: Content(),
  });
};
