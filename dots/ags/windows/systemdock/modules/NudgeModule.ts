import { icons } from "lib/icons";
import { NudgeTimer } from "services/nudgetimer";
import { DockButton } from "./DockButton";
import Label from "types/widgets/label";

const LabelHook = (self: Label<unknown>) => {
  self.hook(NudgeTimer, () => {
    const remainingMins = Math.ceil(NudgeTimer.nudge_remaining / 60000);
    const state = NudgeTimer.nudge_state;

    if (state === "disabled") return self.visible = false;

    self.visible = true;
    self.label = `${remainingMins}m`;
  }, "changed");
};

export function NudgeModule() {
  return Widget.Box({
    className: "dock-module",
    children: [
      Widget.Box({
        className: "nudge",
        children: [
          DockButton({
            icon: icons.tools.nudge,
            tooltip: "Nudge Timer",
            handlePrimaryClick: () => App.toggleWindow("eyenudge"),
          }),
          Widget.Label({
            setup: (self) => LabelHook(self),
          }),
        ],
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
      }),
    ],
  });
}
