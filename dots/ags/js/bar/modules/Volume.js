import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import icons from "../../icons.js";
import FontIcon from "../../misc/FontIcon.js";
import PanelButton from "../PanelButton.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";

function formatVolume(volume) {
  return String(Math.round(volume * 100));
}

function chooseIcon() {
  if (!Audio["speaker"]) return;

  const volume = Audio["speaker"].volume * 100;

  const iconThresholds = {
    0: icons.audio.muted,
    1: icons.audio.low,
    50: icons.audio.high,
  };

  const icon = Object.entries(iconThresholds).reduce(
    (prev, [threshold, name]) => {
      if (volume >= Number(threshold)) return name;
      return prev;
    },
    iconThresholds[0]
  );

  return icon;
}

export default () =>
  PanelButton({
    cursor: "pointer",
    on_clicked: () => {
      if (!Audio["speaker"]) return;
      Audio["speaker"].is_muted = !Audio["speaker"].is_muted;
    },
    class_name: "audio",
    icon: FontIcon().hook(Audio, (self) => {
      if (!Audio["speaker"]) return;
      self.icon = chooseIcon();
    }),
    color: "magenta",
    content: Widget.Label().hook(
      Audio,
      (self) => {
        if (!Audio["speaker"]) return;
        self.label = formatVolume(Audio["speaker"].volume);
      },
      "speaker-changed"
    ),
  });
