import { Stream } from "types/service/audio";
import { icons } from "./icons";
import { icon } from "./utils";

type SpeakerData = {
  icon: string;
  label: string;
};

export type StreamOptions = {
  stream: Stream;
  type: "speaker" | "microphone" | "app";
};

const SpeakerMap: Record<string, SpeakerData> = {
  ".*hdmi-stereo": {
    icon: icons.audio.speaker.class.tv,
    label: "TV",
  },
  ".*analog-stereo": {
    icon: icons.audio.speaker.class.speaker,
    label: "External Speaker",
  },
  ".*stereo-game": {
    icon: icons.audio.speaker.class.headset,
    label: "Headset",
  },
  "bluez_output.70_AE_D5_C2_D1_B1.1": {
    icon: icons.audio.speaker.class.airpods,
    label: "Airpods",
  },
};

export const getSpeakerData = (stream: Stream): SpeakerData | null => {
  if (!stream.name) return null;
  for (const [regex, data] of Object.entries(SpeakerMap)) {
    if (new RegExp(regex).test(stream.name)) return data;
  }
  return null;
};

type Levels = "low" | "medium" | "high" | "muted";

const IconThresholds = (icons: Record<Levels, string>) => ({
  0: icons.muted,
  1: icons.low,
  33: icons.medium,
  66: icons.high,
});

interface MainStreamOptions extends StreamOptions {
  type: Exclude<StreamOptions["type"], "app">;
}

const getMainStreamIcon = ({ stream, type }: MainStreamOptions) =>
  Utils.merge(
    [stream.bind("volume"), stream.bind("is_muted")],
    (volume, isMuted) => {
      if (isMuted) return icons.audio[type].levels.muted;
      const thresholds = IconThresholds(icons.audio[type].levels);
      return Object.entries(thresholds).reduce(
        (icon, [threshold, value]) => {
          if (volume * 100 >= Number(threshold)) return value;
          return icon;
        },
        icons.tools.speaker,
      );
    },
  );

export const getStreamIcon = (options: StreamOptions) => {
  switch (options.type) {
    case "speaker":
    case "microphone":
      return getMainStreamIcon(options as MainStreamOptions);
    case "app":
      return options.stream.bind("name").as((name) =>
        icon(name, icons.fallback.audio)
      );
  }
};
