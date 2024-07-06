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
