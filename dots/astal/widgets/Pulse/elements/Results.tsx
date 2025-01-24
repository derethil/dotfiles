import { bind } from "astal";
import { App, Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { PulseState, TRANSITION_DURATION } from "../state";

export function Results() {
  const state = PulseState.get_default();

  return (
    <Revealer
      revealChild={bind(state, "results").as((r) => r.length > 0)}
      transitionDuration={TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      wrapperProps={{ vertical: true }}
    >
      <scrollable heightRequest={500}>
        <eventbox
          expand={true}
          onClick={() => App.toggle_window("pulse")}
          clickThrough={false}
        >
          <box vertical className="results" expand={false}>
            {bind(state, "results")}
          </box>
        </eventbox>
      </scrollable>
    </Revealer>
  );
}
