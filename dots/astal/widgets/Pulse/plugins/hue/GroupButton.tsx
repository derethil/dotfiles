import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Switch } from "astal/gtk3/widget";
import { Group } from "lib/hue/group";
import { icon } from "utils";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";

interface Props {
  group: Group;
}

const GroupIconMap: Record<string, string> = {
  "Living Room": "couch-symbolic",
  Bedroom: "bed-symbolic",
};

export function GroupButton({ group }: Props) {
  const activate = () => group.toggle();

  return (
    <PulseResult
      activate={activate}
      className={bind(group, "on").as(
        (on) => `group-button ${on ? "on" : "off"}`,
      )}
    >
      <box expand>
        <icon
          halign={Gtk.Align.START}
          icon={icon(GroupIconMap[group.name], "")}
          css="font-size: 28px;"
        />
        Toggle {group.name} Lights
      </box>
      <Switch active={bind(group, "on")} halign={Gtk.Align.END} />
    </PulseResult>
  );
}
