import { bind, Variable } from "astal";
import WirePlumber from "gi://AstalWp";
import { CircleProgress } from "elements";
import { options } from "options";
import { clamp } from "utils";

export function Volume() {
  const wp = WirePlumber.get_default();
  if (!wp) return null;
  const speaker = wp.audio.defaultSpeaker;
  const tooltip = Variable.derive(
    [bind(speaker, "volume"), bind(speaker, "mute")],
    (volume, mute) => {
      if (mute) return "Muted";
      return `${Math.round(volume * 100)}%`;
    },
  );

  const handleScroll = (direction: number) => {
    speaker.volume = clamp(speaker.volume + direction * 0.1, 0, 1);
  };

  return (
    <CircleProgress
      className="list-item"
      value={bind(speaker, "volume")}
      color={options.theme.color.accent[4].default()}
      disabled={bind(speaker, "mute")}
      strokeWidth={5}
      tooltip={tooltip()}
      onScroll={(direction) => handleScroll(direction)}
      onClick={() => (speaker.mute = !speaker.mute)}
    >
      <icon icon={bind(speaker, "volumeIcon")} css="font-size: 15px" />
    </CircleProgress>
  );
}
