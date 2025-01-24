import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Switch } from "astal/gtk3/widget";
import { Group, Light } from "lib/hue";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";

interface Props {
  item: Group | Light;
  icon: Gtk.Widget;
}

export function HueButton({ icon, item }: Props) {
  const activate = () => item.toggle();

  const text = `Light${item instanceof Light ? "" : "s"}`;
  const type = item instanceof Light ? " (light)" : " (group)";

  return (
    <PulseResult
      activate={activate}
      className={bind(item, "on").as(
        (on) => `group-button ${on ? "on" : "off"}`,
      )}
    >
      <box expand>
        {icon}
        <box valign={Gtk.Align.CENTER} vexpand>
          {item.name} {text}
          <label className="type">{type}</label>
        </box>
      </box>
      <Switch active={bind(item, "on")} halign={Gtk.Align.END} />
    </PulseResult>
  );
}
