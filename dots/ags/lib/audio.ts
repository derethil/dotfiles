import { Stream } from "types/service/audio";
import { icons } from "./icons";

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
    label: "External Speaker",
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

type StreamType = "mic" | "volume";
type Threshold = "low" | "medium" | "high" | "muted";

const IconThresholds = (icons: Record<Threshold, string>) => ({
  0: icons.muted,
  1: icons.low,
  33: icons.medium,
  66: icons.high,
});

const getStreamIcon = (stream: Stream, type: StreamType) =>
  Utils.merge(
    [stream.bind("volume"), stream.bind("is_muted")],
    (volume, isMuted) => {
      if (isMuted) return icons.audio.volume.muted;
      const thresholds = IconThresholds(icons.audio[type]);
      return Object.entries(thresholds).reduce(
        (icon, [threshold, value]) => {
          if (volume * 100 >= Number(threshold)) return value;
          return icon;
        },
        icons.audio.volume.high,
      );
    },
  );

export const getVolumeIcon = (stream: Stream) =>
  getStreamIcon(stream, "volume");

export const getMicrophoneIcon = (stream: Stream) =>
  getStreamIcon(stream, "mic");
