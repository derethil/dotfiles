import icons from "lib/icons";
import FontIcon from "widgets/FontIcon";
import IconModule from "../IconModule";

import Brightness from "services/brightness";

const BrightnessModule = () =>
  IconModule({
    labelColor: "red",
    icon: FontIcon({
      label: icons.brightness.screen,
    }),
    child: Widget.Label({
      label: Brightness.bind("backlit").transform((v) => {
        return Math.round(v * 100).toString();
      }),
    }),
  });

export default () =>
  options.mode.value === "laptop" ? BrightnessModule() : Widget.Box();
