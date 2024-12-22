import { Binding, Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { toBinding } from "utils";

interface Props extends Omit<Widget.RevealerProps, "children" | "child" | "revealChild"> {
  contents: Binding<Gtk.Widget[]> | Binding<Gtk.Widget | null>;
  wrapperProps?: Widget.BoxProps;
}

export function DynamicRevealer(props: Props) {
  const duration = toBinding(props.transitionDuration);

  const outerReveal = props.contents.as((c) => {
    if (c === null) return false;
    if (c instanceof Array && c.length === 0) return false;
    return true;
  });

  const innerReveal = Variable(outerReveal.get());
  const children = Variable<Gtk.Widget[] | Gtk.Widget>([]);

  Variable.derive([outerReveal, props.contents]).subscribe(([reveal, items]) => {
    if (reveal && items) {
      innerReveal.set(true);
      children.set(items);
    } else {
      innerReveal.set(false);
      setTimeout(() => children.set([]), duration.get());
    }
  });
  //
  return (
    <revealer {...props} transitionDuration={duration} revealChild={innerReveal()}>
      <box {...props.wrapperProps}>{children()}</box>
    </revealer>
  );
}
