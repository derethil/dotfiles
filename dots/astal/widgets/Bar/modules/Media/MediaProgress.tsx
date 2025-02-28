import { bind, Variable } from "astal";
import Mpris from "gi://AstalMpris";
import { CircleProgress } from "elements";
import { options } from "options";

interface Props {
  player: Mpris.Player;
}

export function MediaProgress({ player }: Props) {
  const progress = Variable.derive(
    [bind(player, "position"), bind(player, "length")],
    (position, length) => {
      if (length === 0) return 0;
      return position / length;
    },
  );

  const coverArt = bind(player, "coverArt").as((c) => {
    let url = c;
    const youtubeLogo = `${SRC}/assets/images/youtube-logo.png`;
    if (player.identity === "Mozilla firefox") url = youtubeLogo;
    return `background-image: url("${url}");`;
  });

  const paused = bind(player, "playbackStatus").as(() => {
    return player.playbackStatus !== Mpris.PlaybackStatus.PLAYING;
  });

  return (
    <CircleProgress
      value={bind(progress)}
      color={options.theme.color.accent[1].default()}
      onClick={() => player.play_pause()}
      onScroll={(direction) => (player.volume += 0.1 * direction)}
      disabled={paused}
    >
      <box className="cover-art" css={coverArt} />
    </CircleProgress>
  );
}
