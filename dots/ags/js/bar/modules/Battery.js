import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import PanelButton from "../PanelButton.js";
import FontIcon from "../../misc/FontIcon.js";
import { batteryIcon } from "../../utils.js";

import Variable from "resource:///com/github/Aylur/ags/variable.js";

/** @param {import('types/service/battery.js').Battery} battery */
const getColor = (battery) => {
  if (battery.percent < 15) return "red";
  if (battery.percent < 30) return "yellow";
  return "green";
};

export default () => {
  let panelButton = Widget.Box();

  Battery.bind("percent").emitter;

  // let result = Battery.bind("changed", () => {
  //   // @ts-ignore
  //   panelButton = PanelButton({
  //     class_name: "battery",
  //     color: getColor(Battery),
  //     icon: FontIcon(batteryIcon(Battery)),
  //     content: Widget.Label({
  //       label: Battery.available ? `${Battery.percent}` : "0",
  //     }),
  //   });
  // });

  return panelButton;
};
