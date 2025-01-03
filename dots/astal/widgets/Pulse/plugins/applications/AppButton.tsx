import { Gdk, Gtk } from "astal/gtk3";
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
      onKeyPressEvent={handleKeyPress}
      setup={(self) => self.connect("clicked", activate)}
    >
      <box>
        <label label={props.app.name} halign={Gtk.Align.START} />
        <icon icon={props.app.iconName} expand halign={Gtk.Align.END} />
      </box>
    </button>
  );
}
