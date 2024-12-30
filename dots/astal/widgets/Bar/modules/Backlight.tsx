import { bind } from "astal";
import { CircleProgress } from "elements";
import { Brightness } from "lib/brightness";
import { options } from "options";

export function Backlight() {
  const backlight = Brightness.get_default();
  if (!backlight) return null;

  return (
    <CircleProgress
      value={bind(backlight, "screen")}
      color={options.theme.color.accent[6].default()}
      strokeWidth={5}
      child={<></>}
    >
      <icon icon="brightness-symbolic" css="font-size: 15px" />
    </CircleProgress>
  );
}
