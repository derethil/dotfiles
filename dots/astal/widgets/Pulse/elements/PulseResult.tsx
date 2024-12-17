import { GObject, Variable } from "astal";
import { astalify, ConstructProps, Gtk, Widget } from "astal/gtk3";
import { BoxProps } from "astal/gtk3/widget";

interface Props extends Gtk.Box.ConstructorProps {
  handleActivate: () => void;
}

export class PulseResult extends astalify(Widget.Box) {
  static {
    GObject.registerClass(this);
  }

  public focused = Variable(false);
  public handleActivate: () => void;

  constructor(props: ConstructProps<PulseResult, Props>) {
    super(props as BoxProps);
    this.toggleClassName("pulse-result");
    this.focused.subscribe((focused) => this.toggleClassName("focused", focused));
    this.handleActivate = (props as Props).handleActivate;
  }

  onActivate() {
    this.handleActivate();
  }
}
