import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { CircleProgress } from "elements";
import { SystemResources } from "lib/systemresources";
import { options } from "options";

export function SystemMonitor() {
  const sr = SystemResources.get_default();

  const tooltip = new Gtk.Tooltip();
  tooltip.set_text("CPU");

  return (
    <box className="system-monitor" halign={Gtk.Align.CENTER} vertical>
      <CircleProgress
        color={options.theme.color.accent[1].default()}
        child={<icon icon="cpu-symbolic" css="font-size: 18px;" />}
        value={bind(sr.cpu, "usage")}
        tooltip={bind(sr.cpu, "usage").as(
          (value) => `${(value * 100).toFixed(0)}%`,
        )}
      />

      <CircleProgress
        color={options.theme.color.accent[3].default()}
        child={<icon icon="memory-symbolic" css="font-size: 18px;" />}
        value={bind(sr.memory, "percent")}
        tooltip={bind(sr.memory, "percent").as(
          (value) => `${value.toFixed(0)}%`,
        )}
      />

      <CircleProgress
        color={options.theme.color.accent[6].default()}
        child={
          <icon icon="gpu-symbolic" css="font-size: 18px; padding-top: 2px;" />
        }
        value={bind(sr.gpu, "percent")}
        tooltip={bind(sr.gpu, "percent").as((value) => `${value.toFixed(0)}%`)}
      />
    </box>
  );
}
