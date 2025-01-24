import { Gtk } from "astal/gtk3";
import { Light } from "lib/hue";
import { HueButton } from "./HueButton";

interface Props {
  light: Light;
}

export function LightButton({ light }: Props) {
  return (
    <HueButton
      item={light}
      icon={
        <icon
          className="light"
          halign={Gtk.Align.START}
          icon="lamp-symbolic"
          css="font-size: 28px;"
        />
      }
    />
  );
}
