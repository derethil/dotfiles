import PanelButton from "../../../widgets/PanelButton";
import FontIcon from "widgets/FontIcon";
import icons from "lib/icons";

export default () =>
  PanelButton({
    cursor: "pointer",
    window: "dashboard",
    on_clicked: () => App.toggleWindow("dashboard"),
    class_name: "dashboard-button",
    child: FontIcon({
      hexpand: true,
      label: icons.dashboard,
    }),
  });
