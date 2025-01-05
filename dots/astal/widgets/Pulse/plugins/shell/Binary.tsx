import { GLib } from "astal";
import { bash } from "utils";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  binary: string;
}

const foot = `${GLib.get_user_config_dir()}/hypr/scripts/launchfoot`;

function launch(binary: string) {
  bash(`${foot} "${binary}"`).catch(console.error);
}

export function Binary(props: Props) {
  const state = PulseState.get_default();
  const activate = () => state.activate(() => launch(props.binary));

  return (
    <PulseResult className="binary" activate={activate}>
      {props.binary}
    </PulseResult>
  );
}
