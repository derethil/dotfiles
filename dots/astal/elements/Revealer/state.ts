import { Binding, GObject, property, register } from "astal";
import { Gtk } from "astal/gtk3";
import { toBinding } from "utils";
import { bindChildren, ChildProps, getChildrenValues } from "utils/children";

@register({ GTypeName: "RevealerState" })
export class RevealerState extends GObject.Object {
  private _children: Gtk.Widget[] = [];
  private transitionDuration: Binding<number | undefined>;

  @property(Boolean)
  declare reveal: boolean;

  @property(Gtk.Widget)
  get children() {
    return this._children;
  }

  constructor(
    children: ChildProps,
    duration: Binding<number | undefined> | number,
  ) {
    super();
    this._children = getChildrenValues(children);
    bindChildren(children).subscribe((children) =>
      this.handleNewChildren(children),
    );

    const d = toBinding(duration);
    this.transitionDuration = d;
    d.subscribe(() => this.notify("transition-duration"));
  }

  private destroyChildren() {
    if (this.reveal) return; // Check if we re-revealed before hide duration completed
    const c = this._children;
    const array = c instanceof Array ? c : [c];
    array.forEach((child) => child.destroy());
    this._children = [];
    this.notify("children");
  }

  private handleNewChildren(children: Gtk.Widget[]) {
    if (children.length > 0) {
      this.reveal = true;
      this._children = children;
      this.notify("children");
    } else {
      this.reveal = false;
      setTimeout(() => this.destroyChildren(), this.transitionDuration.get());
    }
  }
}
