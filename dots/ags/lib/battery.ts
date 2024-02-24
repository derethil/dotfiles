import icons from "lib/icons";
import { options } from "options";

export async function batteryMonitor() {
  const battery = await Service.import("battery");
  battery.connect("notify::percent", ({ percent, charging }) => {
    const { med, low } = options.bar.battery;
    if (percent !== med.value || percent !== low.value || !charging) return;

    Utils.notify({
      summary: `${percent}% Battery Percentage`,
      iconName: icons.battery.warning,
      urgency: "critical",
    });
  });
}
