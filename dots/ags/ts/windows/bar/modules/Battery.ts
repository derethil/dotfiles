const Battery = await Service.import("battery");

import FontIcon from "ts/widgets/FontIcon";
import icons from "ts/icons";
import IconModule from "../IconModule";

function batteryIcon(battery: typeof Battery): string {
  const { available, charging, charged, percent } = battery;
  if (!available) return icons.battery.none;
  if (charged) return icons.battery.chargingFull;
  if (charging) return icons.battery.charging;
  const ceilingTen = Math.ceil(percent / 10) * 10;
  const isKey = ceilingTen in icons.battery;
  if (isKey) return icons.battery[ceilingTen as keyof typeof icons.battery];
  return icons.battery.none;
}

const labelColor = Variable<string>("green");

Battery.connect("changed", () => {
  if (Battery.percent < 15) labelColor.value = "red";
  else if (Battery.percent < 30) labelColor.value = "yellow";
  else labelColor.value = "green";
})

const BatteryModule = () =>
  IconModule({
    labelColor,
    class_name: "clock",
    child: Widget.Label({
      label: Battery.bind("percent").transform((p) => p.toString()),
    }),
    icon: FontIcon({ label: icons.battery.none }).hook(Battery, (self) => {
      self.label = batteryIcon(Battery);
    }),
  });

export default () => {
  if (options.mode.value === "laptop") return BatteryModule();
  return Widget.Box();
};
