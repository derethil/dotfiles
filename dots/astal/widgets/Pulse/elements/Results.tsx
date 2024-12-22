import { bind } from "astal";
import { PulseState, TRANSITION_DURATION } from "../state";
import { DynamicRevealer } from "elements";
import { Gtk } from "astal/gtk3";

export function Results() {
  const state = PulseState.get_default();

  return (
    <DynamicRevealer
      transitionDuration={TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      contents={bind(state, "results")}
      className="results"
      wrapperProps={{ vertical: true }}
    />
  );
}
