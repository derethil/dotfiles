import Clock from "../../misc/Clock";
import PanelButton from "../PanelButton";
import FontIcon from "../../misc/FontIcon";
import icons from "../../icons";

export default () =>
  PanelButton({
    class_name: "clock",
    color: "yellow",
    content: Clock({ format: `%I\n%M` }),
    icon: FontIcon({
      icon: icons.clock,
    }),
  });
