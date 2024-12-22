import { bind } from "astal";
import { PulseState } from "../state";
import { DynamicRevealer } from "elements";
import { Gtk } from "astal/gtk3";

export function Results() {
  const state = PulseState.get_default();

  return (
    <DynamicRevealer
      revealChild={bind(state, "results").as((r) => r.length > 0)}
      transitionDuration={150}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      contents={bind(state, "results")}
    />
  );
}
