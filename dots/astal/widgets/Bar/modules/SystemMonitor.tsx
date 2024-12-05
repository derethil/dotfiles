import { bind } from "astal";
import { CircleProgress } from "elements";
import { SystemResources } from "lib/systemresources";
import { options } from "options";

export function SystemMonitor() {
  const sr = SystemResources.get_default();

  return (
    <CircleProgress
      color={options.theme.color.accent[1].default()}
      child={<icon icon="cpu-symbolic" css="font-size: 18px;" />}
      value={bind(sr.cpu, "usage")}
    />
  );
}
