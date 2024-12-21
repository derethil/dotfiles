import { bind } from "astal";
import AstalBattery from "gi://AstalBattery";
import { CircleProgress } from "elements";
import { options } from "options";

export function Battery() {
  const battery = AstalBattery.get_default();
  if (!battery) return null;

  return (
    <CircleProgress
      value={bind(battery, "percentage")}
      color={options.theme.color.accent[7].default()}
      strokeWidth={5}
      child={<></>}
    >
      <icon icon={bind(battery, "iconName")} css="font-size: 15px" />
    </CircleProgress>
  );
}
