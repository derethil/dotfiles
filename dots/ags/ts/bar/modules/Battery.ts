const battery = await Service.import("battery");

import PanelButton from "../PanelButton";
import FontIcon from "../../misc/FontIcon";
import icons from "../../icons";
import { Battery } from "types/service/battery";
import { Variable } from "resource:///com/github/Aylur/ags/variable.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";

function batteryIcon(battery: Battery): string {
  const { available, charging, charged, percent } = battery;
  if (!available) return icons.battery.none;
  if (charged) return icons.battery.chargingFull;
  if (charging) return icons.battery.charging;
  const ceilingTen = Math.ceil(percent / 10) * 10;
  const isKey = ceilingTen in icons.battery;
  if (isKey) return icons.battery[ceilingTen as keyof typeof icons.battery];
  return icons.battery.none;
}

export default () =>
  PanelButton({
    color: "green",
    class_name: "clock",
    content: Widget.Label({
      label: battery.bind("percent").transform((p) => p.toString()),
    }),
    icon: FontIcon({ icon: icons.battery.none }).hook(battery, (self) => {
      self.icon = batteryIcon(battery);
    }),
  });
