const Mpris = await Service.import("mpris");
import * as mprisWidgets from "widgets/Mpris";
import { FontIcon } from "widgets/FontIcon";
import { icons } from "lib/icons";
import Box from "types/widgets/box";
import { IconModule } from "../IconModule";

const getPlayer = (name = options.bar.media.preferred.value) =>
  Mpris.getPlayer(name) || Mpris.players[0] || null;

export function MediaControls() {
  const update = (self: Box<any, any>) => {
    const player = getPlayer();
    if (!player) return;

    const playPauseButton = mprisWidgets.PlayPauseButton(player);
    const nextButton = mprisWidgets.NextButton(player);
    const prevButton = mprisWidgets.PreviousButton(player);

    self.children = [prevButton, playPauseButton, nextButton];
  };

  return Widget.Revealer({
    revealChild: Mpris.bind("players").as(() => Boolean(Mpris.getPlayer())),
    transitionDuration: options.transition.bind("value"),
    transition: "slide_down",
    className: "mpris",
    child: IconModule({
      icon: FontIcon({
        label: icons.mediaControls,
        className: "mpris-label-icon",
      }),
      labelColor: "green",
      child: Widget.Box({
        className: "controls",
        vertical: true,
        setup: (self) => {
          self.hook(options.bar.media.preferred, update);
          self.hook(Mpris, update, "changed");
        },
      }),
    }),
  });
}
