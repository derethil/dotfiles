import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk?version=3.0";
import { Variable } from "types/variable";
import { PopupMenu } from "./PopupMenu";

interface SelectIconMenuProps {
  className?: string;
  active: Variable<string>;
  options: Record<string, string>;
}

export function SelectIconMenu(props: SelectIconMenuProps) {
  const stack = Widget.Stack({
    shown: props.active.bind(),
    children: Object.entries(props.options).reduce(
      (acc, [label, icon]) => {
        acc[label] = Widget.Icon({ icon });
        return acc;
      },
      {} as Record<string, Gtk.Widget>,
    ),
  });

  const handleActivate = (label: string) => {
    props.active.setValue(label);
  };

  return PopupMenu({
    className: `select-icon-menu ${props.className}`,
    contentAnchor: Gdk.Gravity.SOUTH,
    content: stack,
    optionsAnchor: Gdk.Gravity.NORTH,
    options: Object.entries(stack.children).map(([label, _]) =>
      Widget.MenuItem({
        label,
        on_activate: () => handleActivate(label),
      })
    ),
  });
}
