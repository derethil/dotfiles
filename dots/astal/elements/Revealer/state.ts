import { GObject, property, register } from "astal";
import { Gtk } from "astal/gtk3";
import { options } from "options";
import { toBinding } from "utils";
import { bindChildren, getChildrenValues } from "utils/children";
import { RevealerProps } from ".";

@register({ GTypeName: "RevealerState" })
export class RevealerState extends GObject.Object {
  private _children: Gtk.Widget[] = [];
  private transitionDuration: number;

  @property(Boolean)
  declare reveal: boolean;

  @property(Gtk.Widget)
  get children() {
    return this._children;
  }

  constructor(props: RevealerProps) {
    super();

    this._children = getChildrenValues(props);
    bindChildren(props).subscribe((c) => this.handleNewChildren(c));

    const r = toBinding(props.revealChild);
    this.reveal = r.get() ?? false;
    toBinding(props.revealChild).subscribe((r) => (this.reveal = r ?? false));

    const d = toBinding(props.transitionDuration);
    const defaultDuration = options.theme.transition().get();
    this.transitionDuration = d.get() ?? defaultDuration;
    d.subscribe((d) => (this.transitionDuration = d ?? defaultDuration));
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
      setTimeout(() => this.destroyChildren(), this.transitionDuration);
    }
  }
}
