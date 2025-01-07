import { launchInTerminal } from "utils";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  binary: string;
}

export function Binary(props: Props) {
  const state = PulseState.get_default();
  const activate = () => state.activate(() => launchInTerminal(props.binary));

  return (
    <PulseResult className="binary" activate={activate}>
      {props.binary}
    </PulseResult>
  );
}
