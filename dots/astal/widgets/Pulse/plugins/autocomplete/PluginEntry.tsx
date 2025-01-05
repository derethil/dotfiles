import { Gtk } from "astal/gtk3";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
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

  return (
    <PulseResult activate={activate} className="command-entry">
      <label className="command" label={plugin.command} />
      <label
        className="description"
        label={plugin.description}
        expand
        halign={Gtk.Align.START}
      />
    </PulseResult>
  );
}
