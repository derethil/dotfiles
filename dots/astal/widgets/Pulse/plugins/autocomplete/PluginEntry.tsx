import { Gdk, Gtk } from "astal/gtk3";
import { createKeyHandler } from "utils/binds";
import { PulseState } from "widgets/Pulse/state";
import { PulsePlugin } from "widgets/Pulse/types";

interface Props {
  plugin: PulsePlugin;
}

export function PluginEntry({ plugin }: Props) {
  const state = PulseState.get_default();

  const activate = () => {
    state.query = `${plugin.command} `;
    state.entry?.grab_focus();
    state.entry?.set_position(-1);
  };

  const keyHandler = createKeyHandler(
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
      onClick={activate}
      onKeyPressEvent={keyHandler}
      className="command-entry"
    >
      <box expand>
        <label className="command" label={plugin.command} />
        <label
          className="description"
          label={plugin.description}
          expand
          halign={Gtk.Align.START}
        />
      </box>
    </button>
  );
}
