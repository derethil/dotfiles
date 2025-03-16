import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Switch } from "astal/gtk3/widget";
import { Light } from "lib/hue";
import { HueButtonProps } from ".";

export function ToggleButton(props: HueButtonProps) {
  const { item } = props;

  const suffix = `Light${item instanceof Light ? "" : "s"}`;
  const type = item instanceof Light ? "light" : "group";

  return (
    <box className="label">
      <icon className={type} icon={item.icon} css="font-size: 28px;" />
      <box valign={Gtk.Align.CENTER} hexpand>
        {item.name} {suffix}
        <label className="type">{` (${type})`}</label>
      </box>
      <Switch active={bind(item, "on")} halign={Gtk.Align.END} />
    </box>
  );
}
