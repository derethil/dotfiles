import { Binding } from "astal";
import { Astal, Gtk } from "astal/gtk3";
import { attach, toBinding } from "utils";
import { ChildProps } from "utils/children";

interface Props extends ChildProps {
  icon?: string;
  active: Binding<boolean> | boolean;
  onClick?: (self: Astal.Button) => void;
}

export function OptionButton(props: Props) {
  const active = toBinding(props.active);

  return (
    <button
      className="option-button"
      cursor="pointer"
      hexpand
      halign={Gtk.Align.FILL}
      onClick={props.onClick}
      setup={(self) => {
        const detach = attach(active, (active) => self.toggleClassName("active", active));
        self.connect("destroy", detach);
      }}
    >
      {props.child}
    </button>
  );
}
