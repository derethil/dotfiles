import { bind } from "astal";
import Mpris from "gi://AstalMpris";
import { CircleProgress } from "elements";
import { options } from "options";
import { ProgressState } from "./ProgressState";

interface Props {
  player: Mpris.Player;
}

const isPlaying = (player: Mpris.Player) =>
  player.playbackStatus === Mpris.PlaybackStatus.PLAYING;

export function MediaProgress({ player }: Props) {
  const progress = ProgressState(player);

  const coverArt = bind(player, "coverArt").as(
    (c) => `background-image: url("${c}");`,
  );

  return (
    <CircleProgress
      value={bind(progress)}
      color={options.theme.color.accent[2].default()}
      onClick={() => player.play_pause()}
      disabled={bind(player, "playbackStatus").as(() => !isPlaying(player))}
    >
      <box className="cover-art" css={coverArt} />
    </CircleProgress>
  );
}
