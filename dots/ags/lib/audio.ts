import { Stream } from "types/service/audio";
import { icons } from "./icons";

const Audio = await Service.import("audio");

type SpeakerData = {
  icon: string;
  label: string;
};

const SpeakerMap: Record<string, SpeakerData> = {
  ".*hdmi-stereo": {
    icon: icons.audio.type.tv,
    label: "TV",
  },
  ".*analog-stereo": {
    icon: icons.audio.type.speaker,
    label: "Speaker",
  },
  ".*stereo-game": {
    icon: icons.audio.type.headset,
    label: "Headset",
  },
};

export const getSpeakerData = (stream: Stream): SpeakerData | null => {
  if (!stream.name) return null;
  for (const [regex, data] of Object.entries(SpeakerMap)) {
    if (new RegExp(regex).test(stream.name)) return data;
  }
  return null;
};

const iconThresholds = {
  0: icons.audio.volume.muted,
  1: icons.audio.volume.low,
  33: icons.audio.volume.medium,
  66: icons.audio.volume.high,
};

export const getVolumeIcon = (stream: Stream) =>
  Utils.merge(
    [stream.bind("volume"), stream.bind("is_muted")],
    (volume, isMuted) => {
      if (isMuted) return icons.audio.volume.muted;
      return Object.entries(iconThresholds).reduce(
        (icon, [threshold, value]) => {
          if (volume * 100 >= Number(threshold)) return value;
          return icon;
        },
        icons.audio.volume.high,
      );
    },
  );
