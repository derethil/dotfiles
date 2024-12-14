import { Gtk } from "astal/gtk3";
import { END_ADORNMENT_TRANSITION_DURATION, PulseState } from "../state";

export function EndAdornment() {
  const state = PulseState.get_default();

  return (
    <revealer
      revealChild={state.endShown}
      transitionDuration={END_ADORNMENT_TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
    >
      {state.end}
    </revealer>
  );
}
