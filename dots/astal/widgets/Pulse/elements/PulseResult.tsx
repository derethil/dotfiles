import { Gdk } from "astal/gtk3";
import { createKeyHandler } from "utils/binds";
import { getChildren, ChildProps } from "utils/children";

interface Props extends ChildProps {
  className?: string;
  activate: () => void;
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
    <button
      className={`pulse-result ${props.className}`}
      setup={(self) => self.connect("clicked", props.activate)}
      onClick={props.activate}
      onKeyPressEvent={keyHandler}
    >
      <box expand>{getChildren(props)}</box>
    </button>
  );
}
