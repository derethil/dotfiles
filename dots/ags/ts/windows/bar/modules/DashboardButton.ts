import PanelButton from "../PanelButton";
import FontIcon from "ts/widgets/FontIcon";
import icons from "ts/icons";

export default () =>
  PanelButton({
    class_name: "dashboard-button",
    content: FontIcon({
      icon: icons.dashboard,
    }),
  });
