export function WindowButton() {
  return Widget.Button({
    cursor: "pointer",
    onClicked: () => App.toggleWindow("settings"),
    className: "bar-module window-button",
    child: Widget.Icon("arch-logo-symbolic"),
  });
}
