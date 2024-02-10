import Clock from "ts/widgets/Clock";
import PanelButton from "../PanelButton";
import FontIcon from "ts/widgets/FontIcon";
import icons from "ts/icons";

export default () =>
  PanelButton({
    class_name: "clock",
    color: "yellow",
    content: Clock({ format: `%I\n%M` }),
    icon: FontIcon({
      icon: icons.clock,
    }),
  });
