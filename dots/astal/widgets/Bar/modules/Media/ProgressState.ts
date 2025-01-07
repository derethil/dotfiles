import { Variable, bind } from "astal";
import Mpris from "gi://AstalMpris";

export function ProgressState(player: Mpris.Player) {
  const get = () => {
    if (player.length === 0) return 0;
    return player.position / player.length;
  };

  const progress = Variable(get());

  bind(player, "position").subscribe(() => {
    if (player.playbackStatus === Mpris.PlaybackStatus.PAUSED) return;
    progress.set(get());
  });

  return progress;
}
