import PanelButton from "../../../widgets/PanelButton";
import FontIcon from "ts/widgets/FontIcon";
import icons from "ts/icons";

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
