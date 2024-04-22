const { speaker } = await Service.import("audio");
import { icons } from "lib/icons";
import { IconModule } from "../IconModule";

function volumeLabel(volume: number): string {
  return String(Math.round(volume * 100));
}

function volumeIcon(volume: number): string {
  const iconThresholds = {
    0: icons.audio.volume.muted,
    1: icons.audio.volume.low,
    33: icons.audio.volume.medium,
    66: icons.audio.volume.high,
  };

  const icon = Object.entries(iconThresholds).reduce(
    (prev, [threshold, name]) => {
      if (volume * 100 >= Number(threshold)) return name;
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
    onClicked: () => speaker.is_muted = !speaker.is_muted,
    icon: Widget.Icon({
      size: 22,
      icon: speaker.bind("volume").as(volumeIcon),
    }),
    child: Widget.Label({
      expand: true,
      label: speaker.bind("volume").as(volumeLabel),
    }),
  });
}
