import { GObject } from "astal";
import { astalify, ConstructProps, Gtk } from "astal/gtk3";

type Props = ConstructProps<
  FlowBox,
  Gtk.FlowBox.ConstructorProps,
  {
    onActiateCursorChild: [];
    onChildActivated: [];
    onMoveCursor: [];
    onSelectAll: [];
    onSelectedChildrenChanged: [];
    onToggleCursorChild: [];
    onUnselectAll: [];
  }
>;

export class FlowBox extends astalify(Gtk.FlowBox) {
  static {
    GObject.registerClass(this);
  }

  constructor(props: Props) {
    super(props as object);
  }
}
