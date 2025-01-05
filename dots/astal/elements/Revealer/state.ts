import { Binding, GObject, property, register } from "astal";
import { Gtk } from "astal/gtk3";
import { toBinding } from "utils";

type Children = Gtk.Widget[] | Gtk.Widget | null;

@register({ GTypeName: "RevealerState" })
export class RevealerState extends GObject.Object {
  private _children: Children;
  private transitionDuration: Binding<number | undefined>;

  @property(Boolean)
  declare reveal: boolean;

  @property(Gtk.Widget)
  get children() {
    return this._children;
  }

  constructor(
    children: Binding<Gtk.Widget[]> | Binding<Gtk.Widget | null>,
    duration: Binding<number | undefined> | number,
  ) {
    super();
    this._children = children.get();
    children.subscribe((children) => this.handleNewChildren(children));

    const d = toBinding(duration);
    this.transitionDuration = d;
    d.subscribe(() => this.notify("transition-duration"));
  }

  private shouldReveal(c: Children) {
    if (c === null) return false;
    if (c instanceof Array && c.length === 0) return false;
    return true;
  }

  private destroyChildren() {
    if (this.reveal) return; // Check if we re-revealed before hide duration completed
    if (!this._children) return;
    const c = this._children;
    const array = c instanceof Array ? c : [c];
    array.forEach((child) => child.destroy());
    this._children = c instanceof Array ? [] : null;
    this.notify("children");
  }

  private handleNewChildren(children: Children) {
    if (this.shouldReveal(children)) {
      this.reveal = true;
      this._children = children;
      this.notify("children");
    } else {
      this.reveal = false;
      setTimeout(() => this.destroyChildren(), this.transitionDuration.get());
    }
  }
}
