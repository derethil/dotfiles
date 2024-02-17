import icons from "ts/icons";
import FontIcon from "ts/widgets/FontIcon";
import IconModule from "../IconModule";

const BrightnessModule = () =>
  IconModule({
    labelColor: "red",
    icon: FontIcon({
      label: icons.brightness.screen,
    }),
    child: Widget.Label({
      label: brightness.bind("backlit").transform((v) => {
        return Math.round(v * 100).toString();
      }),
    }),
  });

export default () =>
  options.mode.value === "laptop" ? BrightnessModule() : Widget.Box();
