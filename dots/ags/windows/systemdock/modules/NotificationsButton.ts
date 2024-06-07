import { icons } from "lib/icons";
import { DockButton } from "./DockButton";

export function NotificationsButton() {
  return DockButton({
    handlePrimaryClick: () => App.toggleWindow(`notifications`),
    icon: icons.notifications.base,
    tooltip: "Notifications",
  });
}
