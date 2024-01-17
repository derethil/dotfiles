import PanelButton from "../PanelButton.js";
import FontIcon from "../../misc/FontIcon.js";
import icons from "../../icons.js";

export default () =>
  PanelButton({
    class_name: "dashboard-button",
    content: FontIcon({
      icon: icons.dashboard,
    }),
  });
