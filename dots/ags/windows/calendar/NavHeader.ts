import { icons } from "lib/icons";
import { NavButton } from "./NavButton";
import GLib from "types/@girs/glib-2.0/glib-2.0";
import { Variable } from "types/variable";

interface Props {
  date: Variable<GLib.DateTime>;
  format: string;
  className: string;
  handleNext?: () => void;
  handlePrev?: () => void;
}

export function NavHeader(props: Props) {
  return Widget.Box({
    classNames: [props.className, "nav-header"],
    hexpand: true,
    children: [
      NavButton({
        icon: icons.ui.arrow.left,
        onPrimaryClick: props.handlePrev,
      }),
      Widget.Label({
        hexpand: true,
        label: props.date.bind().as((date) => date.format(props.format) ?? ""),
      }),
      NavButton({
        icon: icons.ui.arrow.right,
        onPrimaryClick: props.handleNext,
      }),
    ],
  });
}
