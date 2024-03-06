import { icons } from "lib/icons";
import { Clock as ClockWidget } from "widgets/Clock";
import { FontIcon } from "widgets/FontIcon";
import { IconModule } from "../IconModule";

export function Clock() {
  return IconModule({
    className: "clock",
    child: ClockWidget({ format: `%I\n%M` }),
    icon: FontIcon({
      label: icons.clock,
    }),
    labelColor: "yellow",
  });
}
