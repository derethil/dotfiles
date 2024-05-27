import { Variable } from "resource:///com/github/Aylur/ags/variable.js";

export class StackState<T> extends Variable<T> {
  static {
    Service.register(this, {}, {});
  }

  items: T[] = [];

  constructor(value: T | T[]) {
    if (!Array.isArray(value)) {
      super(value);
      this.items = [];
    } else if (value.length > 0) {
      super(value[0]);
      this.items = value;
    } else {
      throw new Error("StackState must have at least one item");
    }
  }

  public setIndex(idx: number) {
    this.value = this.items[Math.max(0, Math.min(idx, this.items.length - 1))];
  }

  public setItems(items: T[]) {
    this.items = items;
  }

  public next() {
    const index = this.items.indexOf(this.value) + 1;
    this.value = this.items[index % this.items.length];
  }

  public prev() {
    const index = this.items.indexOf(this.value) - 1 + this.items.length;
    this.value = this.items[index % this.items.length];
  }
}

export type StackStateType<T> = StackState<T>;
