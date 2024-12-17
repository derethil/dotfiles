import { bind } from "astal";
import { PulseState } from "../state";

export function Results() {
  const state = PulseState.get_default();

  return (
    <box className="results" vertical>
      {bind(state.pluginManager, "results").as((r) => r.widgets)}
    </box>
  );
}
