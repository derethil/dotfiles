import { Gdk, Gtk } from "astal/gtk3";
import { createKeyHandler } from "utils/binds";
import { getChildren, ChildProps } from "utils/children";

interface Props extends ChildProps {
  className?: string;
  activate: (button: Gtk.Widget, event?: Gdk.Event) => void;
}

export function PulseResult(props: Props) {
  const keyHandler = createKeyHandler(
    {
      key: Gdk.KEY_Return,
      action: props.activate,
    },
    {
      key: Gdk.KEY_y,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: props.activate,
    },
  );

  return (
    <box className={`pulse-result-wrapper ${props.className}`}>
      <button
        setup={(self) => self.connect("clicked", props.activate)}
        onClick={(self) => props.activate(self)}
        onKeyPressEvent={keyHandler}
        vexpand={false}
      >
        <box expand>{getChildren(props)}</box>
      </button>
    </box>
  );
}
