import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk3";
import { Group, Light } from "lib/hue";
import { createKeyHandler } from "utils/binds";
import { Details } from "./Details";
import { ToggleButton } from "./ToggleButton";

export interface HueButtonProps {
  item: Group | Light;
  icon: Gtk.Widget;
}

export function HueButton({ icon, item }: HueButtonProps) {
  const toggleItem = () => item.toggle();

  const keyHandler = createKeyHandler(
    {
      key: Gdk.KEY_Return,
      action: toggleItem,
    },
    {
      key: Gdk.KEY_y,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: toggleItem,
    },
  );

  return (
    <eventbox
      onKeyPressEvent={keyHandler}
      cursor="pointer"
      className={bind(item, "on").as((on) => {
        let className = "hue-button pulse-result-wrapper";
        className += on ? " on" : " off";
        return className;
      })}
    >
      <box vertical>
        <ToggleButton icon={icon} item={item} onClick={toggleItem} />
        <Details item={item} />
      </box>
    </eventbox>
  );
}
