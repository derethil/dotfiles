import { PanelButton } from "../../../widgets/PanelButton";
import { FontIcon } from "widgets/FontIcon";
import { icons } from "lib/icons";

export function DashboardButton() {
  return PanelButton({
    cursor: "pointer",
    window: "dashboard",
    onClicked: () => App.toggleWindow("dashboard"),
    className: "dashboard-button",
    child: FontIcon({
      hexpand: true,
      label: icons.dashboard,
    }),
  });
}
