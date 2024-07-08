import { icons } from "lib/icons";

export function SystemButton() {
  return Widget.Button({
    cursor: "pointer",
    onClicked: () => App.toggleWindow("settings"),
    className: "bar-module window-button",
    child: Widget.Icon(icons.distro),
  });
}
