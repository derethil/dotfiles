import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { PulseState, TRANSITION_DURATION } from "../state";

export function Results() {
  const state = PulseState.get_default();

  return (
    <Revealer
      transitionDuration={TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      content={bind(state, "results")}
      className="results"
      wrapperProps={{ vertical: true }}
    />
  );
}
