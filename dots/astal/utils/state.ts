import { Variable, Binding, bind } from "astal";
import { Subscribable } from "astal/binding";

export function toVariable<T>(value: Variable<T> | T): Variable<T> {
  return value instanceof Variable ? value : new Variable(value);
}

export function toBinding<T>(value: Binding<T> | T) {
  const subscribable = (value: T): Subscribable<T> => ({
    get: () => value,
    subscribe: () => () => value,
  });

  if (value instanceof Binding) return value;
  return bind(subscribable(value));
}
