import { icons } from "lib/icons";
import { type NudgeState, NudgeTimer } from "services/nudgetimer";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { PopupWindow } from "windows/PopupWindow";

const snooze = (until?: number) => {
  App.toggleWindow("eyenudge");
  NudgeTimer.waitForNudge(until);
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
    label: Utils.merge([
      NudgeTimer.bind("nudge_remaining"),
      NudgeTimer.bind("nudge_state"),
    ], (remaining, state) => {
      if (state === "disabled") return "Disabled";
      const seconds = remaining / 1000;
      return formatSeconds(seconds);
    }),
  });
};

const Actions = (nudgeState: NudgeState) => {
  const ActionFunctions = {
    disable: NudgeTimer.disableNudge,
    close: () => App.toggleWindow("eyenudge"),
    start: NudgeTimer.startNudge,
    startIn: (seconds?: number) => snooze(seconds),
    pause: NudgeTimer.pauseNudge,
  };

  const ActionButton = (label: string, action: () => void) =>
    Widget.Button({
      label,
      onPrimaryClick: () => action(),
    });

  const ActionComponents: Record<NudgeState, Gtk.Widget[]> = {
    disabled: [
      ActionButton("Close", ActionFunctions.close),
      ActionButton("Start in 5m", () => ActionFunctions.startIn(300)),
      ActionButton("Start in 20m", () => ActionFunctions.startIn()),
    ],
    waiting: [
      ActionButton("Close", ActionFunctions.close),
    ],
    pending: [
      ActionButton("Start", ActionFunctions.start),
      ActionButton("Snooze for 5m", () => ActionFunctions.startIn(300)),
      ActionButton("Snooze for 20m", () => ActionFunctions.startIn()),
    ],
    paused: [
      ActionButton("Resume", ActionFunctions.start),
      ActionButton("Snooze for 5m", () => ActionFunctions.startIn(300)),
      ActionButton("Snooze for 20m", () => ActionFunctions.startIn()),
    ],
    running: [
      ActionButton("Pause", ActionFunctions.pause),
      ActionButton("Snooze for 5m", () => ActionFunctions.startIn(300)),
      ActionButton("Snooze for 20m", () => ActionFunctions.startIn()),
    ],
  };

  return ActionComponents[nudgeState];
};

const Title = (nudgeState: NudgeState) => {
  const Titles: Record<NudgeState, string> = {
    pending: "Eye Nudge - Ready",
    running: "Eye Nudge - Look Away",
    paused: "Eye Nudge - Paused",
    waiting: "Eye Nudge - Waiting",
    disabled: "Eye Nudge - Disabled",
  };

  return Titles[nudgeState] ?? "Eye Nudge";
};

const Content = () => {
  const handleDisableNudge = () => {
    Utils.notify({
      summary: "Eye Nudge",
      body: "Nudges have been turned off for now.",
      iconName: icons.tools.nudge,
      actions: { "Undo": () => NudgeTimer.waitForNudge() },
      timeout: 5000,
    });
    NudgeTimer.disableNudge();
    App.toggleWindow("eyenudge");
  };

  const closeVisible = NudgeTimer.bind("nudge_state").as((state) =>
    state !== "disabled"
  );

  return Widget.Box({
    css: "min-width: 500px; min-height: 300px;",
    vertical: true,
    vpack: "fill",
    hexpand: true,
    children: [
      Widget.Overlay({
        overlay: Widget.Box({
          visible: closeVisible,
          className: "close-button",
          hpack: "end",
          child: Widget.Button({
            tooltipText: "Disable",
            cursor: "pointer",
            onPrimaryClick: handleDisableNudge,
            child: Widget.Icon({ icon: "window-close-symbolic", size: 24 }),
          }),
        }),
        child: Widget.Label({
          className: "nudge-title",
          label: NudgeTimer.bind("nudge_state").as(Title),
        }),
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
