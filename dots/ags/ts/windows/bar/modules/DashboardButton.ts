import PanelButton from "../../../widgets/PanelButton";
import FontIcon from "ts/widgets/FontIcon";
import icons from "ts/icons";
import App from "resource:///com/github/Aylur/ags/app.js";
export default () =>
  PanelButton({
    cursor: "pointer",
    window: "dashboard",
    on_clicked: () => App.toggleWindow("dashboard"),
    class_name: "dashboard-button",
    content: FontIcon({
      icon: icons.dashboard,
    }),
  });
