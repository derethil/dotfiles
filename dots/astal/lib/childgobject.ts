import { GObject } from "astal";

// NOTE: This doesn't work as expected, this child GObject thinks it's not a GObject.
// Not sure how to fix this.

interface ParentGObject {
  object: GObject.Object;
  prop: string;
}

export class ChildGObject extends GObject.Object {
  static parent: ParentGObject;
  static instance: ChildGObject;

  // eslint-disable-next-line camelcase
  static get_default(parent: ParentGObject) {
    if (!this.parent && parent) this.parent = parent;
    if (!this.instance) this.instance = new this();
    return this.instance;
  }

  protected notifyParent() {
    if (!ChildGObject.parent) return;
    ChildGObject.parent.object.notify(ChildGObject.parent.prop);
  }
}
