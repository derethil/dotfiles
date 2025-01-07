import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { MediaProgress } from "./MediaProgress";

export function Media() {
  const media = Mpris.get_default();

  return (
    <revealer
      revealChild={bind(media, "players").as((players) => players.length > 0)}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
    >
      <box vertical className="media">
        {bind(media, "players").as((players) =>
          players.map((player) => <MediaProgress player={player} />),
        )}
      </box>
    </revealer>
  );
}
