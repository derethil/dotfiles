import { icons } from "lib/icons";
import { IconModule } from "../IconModule";
import { getVolumeIcon } from "lib/audio";

const { speaker } = await Service.import("audio");

function volumeLabel(volume: number): string {
  return String(Math.round(volume * 100));
}

export function AudioModule() {
  return IconModule({
    cursor: "pointer",
    className: "audio",
    labelColor: "magenta",
    icon: Widget.Icon({
      size: 22,
      icon: getVolumeIcon(speaker),
    }),
    child: Widget.Label({
      expand: true,
      label: speaker.bind("volume").as(volumeLabel),
    }),
  });
}
