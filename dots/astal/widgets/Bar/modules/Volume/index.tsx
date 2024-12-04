import { bind } from "astal";
import WirePlumber from "gi://AstalWp";
import { CircleProgress } from "elements/CircularProgress";

export function Volume() {
  const wp = WirePlumber.get_default();
  if (!wp) {
    return null;
  }

  return <CircleProgress value={bind(wp.audio.default_speaker, "volume")} />;
}
