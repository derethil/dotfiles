import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import PanelButton from "../PanelButton.js";
import * as mpris from "../../misc/mpris.js";
import FontIcon from "../../misc/FontIcon.js";
import options from "../../options.js";
import icons from "../../icons.js";

const getPlayer = (name = options.mpris.preferred.value) =>
  Mpris.getPlayer(name) || Mpris.players[0] || null;

export default () => {
  const update = (self) => {
    const player = getPlayer();
    if (!player) return;

    const playPauseButton = mpris.PlayPauseButton(player);
    const nextButton = mpris.NextButton(player);
    const prevButton = mpris.PreviousButton(player);

    self.children = [prevButton, playPauseButton, nextButton];
  };

  return Widget.Revealer({
    reveal_child: false,
    transition_duration: options.transition.value,
    transition: "slide_down",
    class_name: "mpris",
    child: PanelButton({
      icon: FontIcon({
        icon: icons.mediaControls,
        class_name: "mpris-label-icon",
      }),
      color: "green",
      content: Widget.Box({
        class_name: "controls",
        vertical: true,
        setup: (self) => {
          self.hook(options.mpris.preferred, update);
          self.hook(Mpris, update, "changed");
        },
      }),
    }),
    setup: (self) => {
      self.hook(Mpris, (self) => {
        self.reveal_child = Boolean(Mpris.getPlayer());
      });
    },
  });
};