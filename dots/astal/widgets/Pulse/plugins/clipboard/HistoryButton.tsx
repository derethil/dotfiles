import { Gtk } from "astal/gtk3";
import { CliphistItem } from "lib/cliphist";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface HistoryButtonProps {
  item: CliphistItem;
}

export function HistoryButton(props: Readonly<HistoryButtonProps>) {
  const { item } = props;

  const state = PulseState.get_default();
  const activate = () => state.activate(() => item.copy());

  return (
    <PulseResult className="history" activate={activate}>
      <label className="content" label={item.content} expand halign={Gtk.Align.START} />
    </PulseResult>
  );
}
