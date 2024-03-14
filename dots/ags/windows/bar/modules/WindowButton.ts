import { PanelButton } from "../../../widgets/PanelButton";
import { FontIcon } from "widgets/FontIcon";
import { icons } from "lib/icons";

export function WindowButton() {
  return PanelButton({
    cursor: "pointer",
    window: options.bar.windowButtonOpens.value,
    onClicked: () => App.toggleWindow(options.bar.windowButtonOpens.value),
    className: "window-button",
    child: FontIcon({
      hexpand: true,
      label: icons.dashboard,
    }),
  });
}
