import { Gdk } from "astal/gtk3";
import Apps from "gi://AstalApps";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  app: Apps.Application;
}

export function AppButton(props: Props) {
  const state = PulseState.get_default();
  const activate = () => state.activate(() => props.app.launch());

  return (
    <button
      className="pulse-result application"
      onClick={activate}
      onKeyPressEvent={(_, event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Return) activate();
      }}
    >
      {props.app.name}
    </button>
  );
}
