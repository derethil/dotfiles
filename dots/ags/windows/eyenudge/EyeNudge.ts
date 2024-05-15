import { PopupWindow } from "windows/PopupWindow";
import { type NudgeState, NudgeTimer } from "services/nudgetimer";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

const NudgeRemaining = () => {
  return Widget.Label({
    vexpand: true,
    className: "nudge-remaining",
    label: NudgeTimer.bind("nudge_remaining").as((remaining) => {
      const seconds = remaining / 1000;
      const padding = seconds < 10 ? " " : "";
      return `${padding}${seconds.toFixed(2)}s`;
    }),
  });
};

const Actions = (nudgeState: NudgeState) => {
  const start = () => NudgeTimer.startNudge();
  const pause = () => NudgeTimer.pauseNudge();

  const snooze = (until?: number) => {
    App.toggleWindow("eyenudge");
    NudgeTimer.waitForNudge(until);
  };

  const statefulActions: Partial<Record<NudgeState, Gtk.Widget[]>> = {
    pending: [
      Widget.Button({
        label: "Start",
        onPrimaryClick: start,
      }),
    ],
    paused: [
      Widget.Button({
        label: "Resume",
        onPrimaryClick: start,
      }),
    ],
    running: [
      Widget.Button({
        label: "Pause",
        onPrimaryClick: pause,
      }),
    ],
  };

  return [
    ...statefulActions[nudgeState] ?? [],
    Widget.Button({
      label: "Snooze",
      onPrimaryClick: () => snooze(5),
    }),
    Widget.Button({
      label: "Skip",
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
