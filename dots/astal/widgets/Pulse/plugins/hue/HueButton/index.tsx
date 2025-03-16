import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Group, Light } from "lib/hue";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { ToggleButton } from "./ToggleButton";

export interface HueButtonProps {
  item: Group | Light;
  icon: Gtk.Widget;
}

export function HueButton({ icon, item }: HueButtonProps) {
  const toggleItem = () => item.toggle();

  return (
    <PulseResult
      activate={toggleItem}
      className={bind(item, "on").as((on) => {
        let className = "hue-button pulse-result-wrapper";
        className += on ? " on" : " off";
        return className;
      })}
    >
      <ToggleButton icon={icon} item={item} />
    </PulseResult>
  );
}
