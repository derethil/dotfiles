import { icons } from "lib/icons";
import { IconModule } from "../IconModule";

const Battery = await Service.import("battery");

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

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

export const BatteryModule = () =>
  IconModule({
    labelColor: Battery.bind("percent").as((percent) => {
      if (percent < 15) return "red";
      if (percent < 30) return "yellow";
      return "green";
    }),
    tooltipText: Battery.bind("time_remaining").as((seconds) => {
      const formatted = formatTime(seconds);
      return `${formatted} until ${
        Battery.charging ? "fully charged" : "empty"
      }`;
    }),
    className: "battery",
    child: Widget.Label({
      label: Battery.bind("percent").transform((p) => p.toString()),
    }),
    icon: Widget.Icon({
      size: 18,
      setup: (self) =>
        self.hook(Battery, () => self.icon = batteryIcon(Battery)),
    }),
  });
