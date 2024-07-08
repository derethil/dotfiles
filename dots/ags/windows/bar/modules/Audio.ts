import { IconModule } from "../IconModule";
import { getVolumeIcon } from "lib/audio";

const { speaker } = await Service.import("audio");

function volumeLabel(volume: number): string {
  return String(Math.round(volume * 100));
}

export function AudioModule() {
  const label = speaker.bind("volume").as(volumeLabel);

  return IconModule({
    cursor: "pointer",
    className: "audio",
    labelColor: "magenta",
    icon: Widget.Icon({
      size: 22,
      icon: getVolumeIcon(speaker),
    }),
    threeColumns: label.as((volume) => volume.toString().length > 2),
    child: Widget.Label({ expand: true, label: label }),
  });
}
