import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { TRANSITION_DURATION, PulseState } from "../state";
import { Revealer } from "elements";

export function EndAdornment() {
  const state = PulseState.get_default();

  return (
    <Revealer
      className="end-adornment"
      transitionDuration={TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      content={bind(state, "endWidget")}
    />
  );
}
