import { Binding, Variable } from "astal";
import { Subscribable } from "astal/binding";
import { toBinding } from "utils";

export interface ChildProps {
  child?: JSX.Element | Binding<JSX.Element> | Binding<JSX.Element[]>;
  children?: JSX.Element[] | Binding<JSX.Element[]>;
}

export type MergedChildren = ReturnType<typeof getChildren>;

export function getChildren(props: ChildProps) {
  const children = [];
  if (props.child) children.push(props.child);
  if (props.children) children.push(props.children);
  return children;
}

export function getChildrenValues(props: ChildProps) {
  return getChildren(props).flatMap((child) => {
    if (child instanceof Binding) return child.get();
    return child;
  });
}

export function getChildrenBinds(props: ChildProps) {
  return getChildren(props).map((child) => {
    if (!(child instanceof Binding)) return toBinding(child);
    return child.as((child) => {
      if (Array.isArray(child)) return child;
      return child;
    });
  });
}

export function bindChildren(props: ChildProps): Subscribable<JSX.Element[]> {
  return {
    get: () => getChildrenValues(props),
    subscribe: (callback) => {
      const binds = getChildrenBinds(props);
      return Variable.derive(binds).subscribe((value) => callback(value.flat()));
    },
  };
}
