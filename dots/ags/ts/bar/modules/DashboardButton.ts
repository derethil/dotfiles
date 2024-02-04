import PanelButton from "../PanelButton";
import FontIcon from "../../misc/FontIcon";
import icons from "../../icons";

export default () =>
  PanelButton({
    class_name: "dashboard-button",
    content: FontIcon({
      icon: icons.dashboard,
    }),
  });
