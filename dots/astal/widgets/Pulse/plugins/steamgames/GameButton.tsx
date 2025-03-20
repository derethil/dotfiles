import { Gtk } from "astal/gtk3";
import { SteamGame } from "lib/steamgames";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  game: SteamGame;
}

export function GameButton(props: Props) {
  const { game } = props;

  const state = PulseState.get_default();
  const activate = () => state.activate(() => game.launch());

  return (
    <PulseResult className="application" activate={activate}>
      <label label={game.name} halign={Gtk.Align.START} />
    </PulseResult>
  );
}
