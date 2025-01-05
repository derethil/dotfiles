import { Binding } from "astal";

export interface ChildProps {
  child?: JSX.Element | Binding<JSX.Element> | Binding<JSX.Element[]>;
  children?: JSX.Element[] | Binding<JSX.Element[]>;
}

export function getChildren(props: ChildProps) {
  const children = [];
  if ("child" in props && props.child) children.push(props.child);
  if ("children" in props && props.children) {
    if (Array.isArray(props.children)) {
      children.push(...props.children);
    } else {
      children.push(props.children);
    }
  }
  return children;
}
