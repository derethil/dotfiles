import Brightness from "ts/services/brightness";
import PanelButton from "../PanelButton";
import icons from "ts/icons";
import FontIcon from "ts/misc/FontIcon";
import options from "ts/options";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js";

const BrightnessModule = () =>
  PanelButton({
    color: "red",
    icon: FontIcon({
      icon: icons.brightness.screen,
    }),
    content: Widget.Label({
      label: Brightness.bind("backlit").transform((v) => {
        return Math.round(v * 100).toString();
      }),
    }),
  });

export default () =>
  options.mode.value === "laptop" ? BrightnessModule() : Widget.Box();