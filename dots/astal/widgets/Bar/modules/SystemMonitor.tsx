import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { CircleProgress } from "elements";
import { SystemResources } from "lib/systemresources";
import { options } from "options";
import { testDependencies } from "utils";

export function SystemMonitor() {
  const sr = SystemResources.get_default();
  const isNvidia = testDependencies("nvidia-smi");

  return (
    <box className="system-monitor" halign={Gtk.Align.CENTER} vertical>
      <CircleProgress
        className="list-item"
        color={options.theme.color.accent[1].default()}
        value={bind(sr.cpu, "usage")}
      >
        <icon icon="cpu-symbolic" css="font-size: 18px;" />
      </CircleProgress>

      <CircleProgress
        className="list-item"
        color={options.theme.color.accent[3].default()}
        value={bind(sr.memory, "percent")}
      >
        <icon icon="memory-symbolic" css="font-size: 18px;" />
      </CircleProgress>

      {isNvidia && (
        <CircleProgress
          className="list-item"
          color={options.theme.color.accent[6].default()}
          value={bind(sr.gpu, "percent")}
        >
          <icon icon="gpu-symbolic" css="font-size: 18px; padding-top: 2px;" />
        </CircleProgress>
      )}
    </box>
  );
}
