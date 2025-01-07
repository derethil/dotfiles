import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { TRANSITION_DURATION, PulseState } from "../state";

export function SearchAdornment() {
  const state = PulseState.get_default();

  return (
    <Revealer
      className="end-adornment"
      transitionDuration={TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
    >
      {bind(state, "end").as((end) => end ?? [])}
    </Revealer>
  );
}
