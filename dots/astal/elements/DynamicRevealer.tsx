import { Binding, Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { toBinding } from "utils";

interface Props extends Omit<Widget.RevealerProps, "children"> {
  contents: Binding<Gtk.Widget[]> | Binding<Gtk.Widget>;
}

export function DynamicRevealer(props: Props) {
  const duration = toBinding(props.transitionDuration);

  const outerReveal = toBinding(props.revealChild);
  const innerReveal = Variable(outerReveal.get());
  const children = Variable<Gtk.Widget[] | Gtk.Widget>([]);

  Variable.derive([outerReveal, props.contents]).subscribe(([reveal, items]) => {
    if (reveal) {
      innerReveal.set(true);
      children.set(items);
    } else {
      innerReveal.set(false);
      setTimeout(() => children.set([]), duration.get());
    }
  });
  //
  return (
    <revealer transitionDuration={duration} revealChild={innerReveal()}>
      <box vertical className="results">
        {children()}
      </box>
    </revealer>
  );
}
