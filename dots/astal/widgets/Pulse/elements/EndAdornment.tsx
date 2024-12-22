import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { TRANSITION_DURATION, PulseState } from "../state";
import { DynamicRevealer } from "elements";

export function EndAdornment() {
  const state = PulseState.get_default();

  return (
    <DynamicRevealer
      className="end-adornment"
      transitionDuration={TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      contents={bind(state, "endWidget")}
    />
  );
}
