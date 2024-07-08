import { icons } from "lib/icons";
import { Brightness } from "services/brightness";
import { IconModule } from "../IconModule";

export function Backlight() {
  return IconModule({
    className: "backlight",
    labelColor: "red",
    icon: Widget.Icon({ icon: icons.tools.backlight, size: 32 }),
    child: Widget.Label({
      label: Brightness.bind("screen").as((v) =>
        Math.round(v * 100).toString()
      ),
    }),
  });
}
