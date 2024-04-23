import { PanelButton } from "../../../widgets/PanelButton";

export function WindowButton() {
  return PanelButton({
    cursor: "pointer",
    window: "settings",
    onClicked: () => App.toggleWindow("settings"),
    className: "window-button",
    child: Widget.Icon("arch-logo-symbolic"),
  });
}
