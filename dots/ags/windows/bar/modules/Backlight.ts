import { icons } from "lib/icons";
import { IconModule } from "../IconModule";

import { Brightness } from "services/brightness";

export function Backlight() {
  return IconModule({
    labelColor: "red",
    icon: Widget.Icon(icons.brightness.screen),
    child: Widget.Label({
      label: Brightness.bind("screen").as((v) =>
        Math.round(v * 100).toString()
      ),
    }),
  });
}
