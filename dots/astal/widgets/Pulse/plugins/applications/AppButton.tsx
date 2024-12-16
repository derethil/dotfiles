import { Gdk } from "astal/gtk3";
import Apps from "gi://AstalApps";
import { createKeyHandler } from "utils/binds";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  app: Apps.Application;
}

export function AppButton(props: Props) {
  const state = PulseState.get_default();
  const activate = () => state.activate(() => props.app.launch());

  const handleKeyPress = createKeyHandler(
    {
      key: Gdk.KEY_Return,
      action: activate,
    },
    {
      key: Gdk.KEY_y,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: activate,
    },
  );

  return (
    <button
      className="pulse-result application"
      onClick={activate}
      onKeyPressEvent={(_, event) => handleKeyPress(event)}
    >
      {props.app.name}
    </button>
  );
}
