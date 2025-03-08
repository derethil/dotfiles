import { register } from "astal";
import { Widget, Gtk } from "astal/gtk3";

export interface IndicatedButtonProps extends Widget.ButtonProps {
  indicator: Gtk.Widget;
}

@register({ GTypeName: "IndicatedButton" })
export class IndicatedButton extends Widget.Button {
  public indicator: Gtk.Widget;

  constructor(props: IndicatedButtonProps) {
    super(props);
    this.indicator = props.indicator;
  }
}
