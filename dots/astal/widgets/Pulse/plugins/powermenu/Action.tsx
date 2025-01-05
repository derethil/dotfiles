import { Gtk } from "astal/gtk3";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";
import { PowerAction } from "./actions";

export function Action(props: PowerAction) {
  const state = PulseState.get_default();

  const handleAction = (self: Gtk.Widget) => {
    state.activate(() => {
      props.activate(self)?.catch(console.error);
    });
  };

  return (
    <PulseResult className={props.className} activate={handleAction}>
      <icon icon={props.icon} />
      {props.label}
    </PulseResult>
  );
}
