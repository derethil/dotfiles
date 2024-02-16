const battery = await Service.import("battery");
import { Battery } from "types/service/battery";

import PanelButton from "../../../widgets/PanelButton";
import FontIcon from "ts/widgets/FontIcon";
import icons from "ts/icons";
import options from "ts/options";

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

const BatteryModule = () =>
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

export default () => {
  if (options.mode.value === "laptop") return BatteryModule();
  return Widget.Box();
};
