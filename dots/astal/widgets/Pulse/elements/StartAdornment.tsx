import { bind } from "astal";
import { PulseState } from "../state";

export function StartAdornment() {
  const state = PulseState.get_default();

  return <icon className="start-icon" icon={bind(state, "startIcon")} />;
}
