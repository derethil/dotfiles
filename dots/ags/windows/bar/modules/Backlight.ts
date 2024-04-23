import { icons } from "lib/icons";
import { IconModule } from "../IconModule";
import { Brightness } from "services/brightness";

export function Backlight() {
  return IconModule({
    className: "backlight",
    labelColor: "red",
    icon: Widget.Icon({ icon: icons.brightness.screen, size: 32 }),
    child: Widget.Label({
      label: Brightness.bind("screen").as((v) =>
        Math.round(v * 100).toString()
      ),
    }),
  });
}
