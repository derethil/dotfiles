import icons from "ts/icons";
import Clock from "ts/widgets/Clock";
import FontIcon from "ts/widgets/FontIcon";
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
