import { PanelButton } from "../../../widgets/PanelButton";

export function WindowButton() {
  return PanelButton({
    cursor: "pointer",
    window: "dashboard",
    onClicked: () => App.toggleWindow("dashboard"),
    className: "window-button",
    child: Widget.Icon("arch-logo-symbolic"),
  });
}
