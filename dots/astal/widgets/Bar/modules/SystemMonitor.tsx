import { bind } from "astal";
import { CircleProgress } from "elements";
import { SystemResources } from "lib/systemresources";
import { options } from "options";

export function SystemMonitor() {
  const sr = SystemResources.get_default();

  return (
    <box vertical className="system-monitor">
      <CircleProgress
        color={options.theme.color.accent[1].default()}
        child={<icon icon="cpu-symbolic" css="font-size: 18px;" />}
        value={bind(sr.cpu, "usage")}
      />

      <CircleProgress
        color={options.theme.color.accent[3].default()}
        child={<icon icon="memory-symbolic" css="font-size: 18px;" />}
        value={bind(sr.memory, "percent")}
      />

      <CircleProgress
        color={options.theme.color.accent[6].default()}
        child={<icon icon="gpu-symbolic" css="font-size: 18px; padding-top: 2px;" />}
        value={bind(sr.gpu, "percent")}
      />
    </box>
  );
}
