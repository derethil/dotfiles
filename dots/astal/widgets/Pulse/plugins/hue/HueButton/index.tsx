import { bind, Variable } from "astal";
import { Gdk, Gtk } from "astal/gtk3";
import { Group, Light } from "lib/hue";
import { options } from "options";
import { createKeyHandler } from "utils/binds";
import { Details } from "./Details";
import { ToggleButton } from "./ToggleButton";

export interface HueButtonProps {
  item: Group | Light;
  icon: Gtk.Widget;
}

export function HueButton({ icon, item }: HueButtonProps) {
  const revealed = Variable(false);
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
      onDestroy={() => revealed.drop()}
      className={bind(item, "on").as((on) => {
        let className = "hue-button pulse-result-wrapper";
        className += on ? " on" : " off";
        return className;
      })}
    >
      <box vertical>
        <box>
          <ToggleButton icon={icon} item={item} onClick={toggleItem} />
          <button
            onClick={() => revealed.set(!revealed.get())}
            className="toggle-details"
            heightRequest={16}
            widthRequest={16}
            valign={Gtk.Align.CENTER}
          >
            <icon icon="go-down" />
          </button>
        </box>
        <Details item={item} />
      </box>
    </eventbox>
  );
}
