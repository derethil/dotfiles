const Audio = await Service.import("audio");
import { icons } from "lib/icons";
import { FontIcon } from "widgets/FontIcon";
import { IconModule } from "../IconModule";

function formatVolume(volume: number) {
  return String(Math.round(volume * 100));
}

/**
 * @returns {string}
 */
function chooseIcon() {
  if (!Audio["speaker"]) return "";

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

export function AudioModule() {
  return IconModule({
    cursor: "pointer",
    className: "audio",
    labelColor: "magenta",
    onClicked: () => {
      if (!Audio["speaker"]) return;
      Audio["speaker"].is_muted = !Audio["speaker"].is_muted;
    },
    icon: FontIcon().hook(Audio, (self) => {
      self.label = chooseIcon();
    }),
    child: Widget.Label({ expand: true }).hook(
      Audio,
      (self) => (self.label = formatVolume(Audio["speaker"].volume)),
      "speaker-changed"
    ),
  });
}
