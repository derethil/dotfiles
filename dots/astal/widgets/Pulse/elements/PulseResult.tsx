import { Binding } from "astal";
import { Gdk, Gtk } from "astal/gtk3";
import { toBinding } from "utils";
import { createKeyHandler } from "utils/binds";
import { getChildren, ChildProps } from "utils/children";

interface Props extends ChildProps {
  className?: string | Binding<string>;
  tooltip?: string;
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

  const className = toBinding(props.className).as(
    (className) => `pulse-result-wrapper ${className}`,
  );

  return (
    <eventbox
      className={className}
      setup={(self) => self.connect("click", props.activate)}
    >
      <button
        tooltipText={props.tooltip}
        onClick={(self) => props.activate(self)}
        onKeyPressEvent={keyHandler}
        vexpand={false}
        hexpand
        cursor="pointer"
      >
        <box expand>{getChildren(props)}</box>
      </button>
    </eventbox>
  );
}
