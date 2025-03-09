import GObject from "astal/gobject";
import { astalify, ConstructProps, Gtk } from "astal/gtk3";
import { options } from "options";

type SeparatorProps = ConstructProps<Separator, Gtk.Separator.ConstructorProps>;

export class Separator extends astalify(Gtk.Separator) {
  static {
    GObject.registerClass(this);
  }

  private _halign: Gtk.Align | undefined;
  private _valign: Gtk.Align | undefined;

  public constructor(props: SeparatorProps) {
    // @ts-expect-error not typed correctly
    super(props);
  }

  get widthRequest() {
    if (this.orientation === Gtk.Orientation.HORIZONTAL) return 0;
    return options.theme.layout.borderWidth.get();
  }

  get heightRequest() {
    if (this.orientation === Gtk.Orientation.VERTICAL) return 0;
    return options.theme.layout.borderWidth.get();
  }

  set halign(align: Gtk.Align) {
    this._halign = align;
  }

  get halign() {
    if (this._halign) return this._halign;
    if (this.orientation === Gtk.Orientation.HORIZONTAL) return Gtk.Align.FILL;
    return Gtk.Align.CENTER;
  }

  set valign(align: Gtk.Align) {
    this._valign = align;
  }

  get valign() {
    if (this._valign) return this._valign;
    if (this.orientation === Gtk.Orientation.VERTICAL) return Gtk.Align.FILL;
    return Gtk.Align.CENTER;
  }
}
