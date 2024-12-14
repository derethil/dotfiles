import { PulseState } from "../state";

export function StartAdornment() {
  const state = PulseState.get_default();

  return <icon icon={state.startIcon()} />;
}
