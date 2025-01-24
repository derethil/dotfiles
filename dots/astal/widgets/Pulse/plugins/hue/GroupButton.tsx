import { Gtk } from "astal/gtk3";
import { Group } from "lib/hue";
import { icon } from "utils";
import { HueButton } from "./HueButton";

interface Props {
  group: Group;
}

const GroupIconMap: Record<string, string> = {
  "Living Room": "couch-symbolic",
  Bedroom: "bed-symbolic",
};

export function GroupButton({ group }: Props) {
  return (
    <HueButton
      item={group}
      icon={
        <icon
          className="group"
          halign={Gtk.Align.START}
          icon={icon(GroupIconMap[group.name], "hi")}
          css="font-size: 28px;"
        />
      }
    />
  );
}
