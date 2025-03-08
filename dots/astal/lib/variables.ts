import { Variable } from "astal";
import { Subscribable } from "astal/binding";
import { Gtk } from "astal/gtk3";

export type VariableArray<T> = Variable<T[]> & {
  push: (value: T) => void;
  remove: (value: T) => void;
};

export function VariableArray<T>(initial: T[]): VariableArray<T> {
  const variable = Variable<T[]>(initial);

  const push = (value: T) => {
    variable.set([...variable.get(), value]);
  };

  const remove = (value: T) => {
    variable.set(variable.get().filter((item) => item !== value));
  };

  Object.assign(variable, { push, remove });

  return variable as VariableArray<T>;
}

export class WidgetMap<K, T = Gtk.Widget> implements Subscribable {
  private subs = new Set<(v: [K, T][]) => void>();
  private map: Map<K, T>;

  private _notify() {
    const value = this.get();
    for (const sub of this.subs) {
      sub(value);
    }
  }

  private _delete(key: K) {
    const v = this.map.get(key);

    if (v instanceof Gtk.Widget) {
      v.destroy();
    }

    this.map.delete(key);
  }

  constructor(initial?: Iterable<[K, T]>) {
    this.map = new Map(initial);
  }

  set(key: K, value: T) {
    this._delete(key);
    this.map.set(key, value);
    this._notify();
  }

  public delete(key: K) {
    this._delete(key);
    this._notify();
  }

  public get() {
    return [...this.map.entries()];
  }

  public subscribe(callback: (v: [K, T][]) => void) {
    this.subs.add(callback);
    return () => this.subs.delete(callback);
  }
}
