import { icons } from "lib/icons";
import { IconModule } from "../IconModule";
import { MprisPlayer } from "types/service/mpris";

const Mpris = await Service.import("mpris");

const getPlayer = (name = options.bar.media.preferred.value) =>
  Mpris.getPlayer(name) || Mpris.players[0] || null;

const PlayPauseButton = (player: MprisPlayer) => {
  return Widget.Button({
    onPrimaryClick: () => player.playPause(),
    cursor: "pointer",
    visible: player.bind("can_play"),
    child: Widget.Icon({
      icon: player.bind("play_back_status").as((status) => {
        switch (status) {
          case "Playing":
            return icons.mpris.playing;
          case "Paused":
          case "Stopped":
            return icons.mpris.stopped;
        }
      }),
    }),
  });
};

const NextButton = (player: MprisPlayer) => {
  return Widget.Button({
    onPrimaryClick: () => player.next(),
    cursor: "pointer",
    visible: player.bind("can_go_next"),
    child: Widget.Icon({
      icon: icons.mpris.next,
    }),
  });
};

const PreviousButton = (player: MprisPlayer) => {
  return Widget.Button({
    onPrimaryClick: () => player.previous(),
    cursor: "pointer",
    visible: player.bind("can_go_prev"),
    child: Widget.Icon({
      icon: icons.mpris.prev,
    }),
  });
};

const getPlayerControls = () => {
  const player = getPlayer();

  if (!player) return [];

  const playPauseButton = PlayPauseButton(player);
  const nextButton = NextButton(player);
  const prevButton = PreviousButton(player);

  return [prevButton, playPauseButton, nextButton];
};

export function MediaControls() {
  return Widget.Revealer({
    revealChild: Mpris.bind("players").as(() => Boolean(Mpris.getPlayer())),
    transitionDuration: options.transition.bind(),
    transition: "slide_down",
    className: "media",
    child: IconModule({
      icon: Widget.Icon({
        size: 20,
        icon: icons.mediaControls,
      }),
      labelColor: "green",
      child: Widget.Box({
        className: "controls",
        vertical: true,
        children: Utils.merge([
          options.bar.media.preferred.bind(),
          Mpris.bind("players"),
        ], getPlayerControls),
      }),
    }),
  });
}
