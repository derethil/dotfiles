import { Gtk } from "astal/gtk3";
import Apps from "gi://AstalApps";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  app: Apps.Application;
}

export function AppButton(props: Props) {
  const state = PulseState.get_default();
  const activate = () => state.activate(() => props.app.launch());

  return (
    <PulseResult className="pulse-result application" activate={activate}>
      <label label={props.app.name} halign={Gtk.Align.START} />
      <icon icon={props.app.iconName} expand halign={Gtk.Align.END} />
    </PulseResult>
  );
}
