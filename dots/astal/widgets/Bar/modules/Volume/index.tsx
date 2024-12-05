import { bind } from "astal";
import WirePlumber from "gi://AstalWp";
import { CircleProgress } from "elements/CircleProgress";
import { options } from "options";

export function Volume() {
  const wp = WirePlumber.get_default();
  if (!wp) {
    return null;
  }

  return (
    <CircleProgress
      value={bind(wp.audio.defaultSpeaker, "volume")}
      color={options.theme.color.accent[1].default()}
      disabled={bind(wp.audio.defaultSpeaker, "mute")}
      strokeWidth={5}
      child={<></>}
    >
      <icon icon={bind(wp.audio.defaultSpeaker, "volumeIcon")} />
    </CircleProgress>
  );
}
