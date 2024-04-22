import { PanelButton } from "../../../widgets/PanelButton";
import { FontIcon } from "widgets/FontIcon";
import { icons } from "lib/icons";

export function WindowButton() {
  return PanelButton({
    cursor: "pointer",
    window: "dashboard",
    onClicked: () => App.toggleWindow("dashboard"),
    className: "window-button",
    child: Widget.Icon("arch-logo-symbolic"),
  });
}
