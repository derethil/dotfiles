import { launchInTerminal } from "utils";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  binary: string;
  arguments?: string[];
}

export function Binary(props: Props) {
  const state = PulseState.get_default();
  const command = `${props.binary} ${props.arguments?.join(" ") ?? ""}`;
  const activate = () => state.activate(() => launchInTerminal(command));

  return (
    <PulseResult className="binary" activate={activate}>
      {props.binary}
    </PulseResult>
  );
}
