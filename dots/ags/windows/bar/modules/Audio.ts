const Audio = await Service.import("audio");
import { icons } from "lib/icons";
import { FontIcon } from "widgets/FontIcon";
import { IconModule } from "../IconModule";

function formatVolume(volume: number) {
  return String(Math.round(volume * 100));
}

function chooseIcon(): string {
  if (!Audio["speaker"]) return "";

  const volume = Audio["speaker"].volume * 100;

  const iconThresholds = {
    0: icons.audio.volume.muted,
    1: icons.audio.volume.low,
    33: icons.audio.volume.medium,
    66: icons.audio.volume.high,
  };

  const icon = Object.entries(iconThresholds).reduce(
    (prev, [threshold, name]) => {
      if (volume >= Number(threshold)) return name;
      return prev;
    },
    iconThresholds[0],
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
    icon: Widget.Icon({ size: 22 }).hook(Audio, (self) => {
      self.icon = chooseIcon();
    }),
    child: Widget.Label({ expand: true }).hook(
      Audio,
      (self) => (self.label = formatVolume(Audio["speaker"].volume)),
      "speaker-changed",
    ),
  });
}
