import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Switch } from "astal/gtk3/widget";
import { Light } from "lib/hue";
import { HueButtonProps } from ".";

interface ToggleButtonProps extends HueButtonProps {
  onClick: () => void;
}

export function ToggleButton({ icon, item, onClick }: ToggleButtonProps) {
  const text = `Light${item instanceof Light ? "" : "s"}`;
  const type = item instanceof Light ? " (light)" : " (group)";

  return (
    <button onClick={onClick} cursor="pointer" focusOnClick={false}>
      <box className="label">
        {icon}
        <box valign={Gtk.Align.CENTER} hexpand>
          {item.name} {text}
          <label className="type">{type}</label>
        </box>
        <Switch active={bind(item, "on")} halign={Gtk.Align.END} />
      </box>
    </button>
  );
}
