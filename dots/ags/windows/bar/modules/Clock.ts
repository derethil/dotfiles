import icons from "lib/icons";
import Clock from "widgets/Clock";
import FontIcon from "widgets/FontIcon";
import IconModule from "../IconModule";

export default () =>
  IconModule({
    class_name: "clock",
    child: Clock({ format: `%I\n%M` }),
    icon: FontIcon({
      label: icons.clock,
    }),
    labelColor: "yellow",
  });
