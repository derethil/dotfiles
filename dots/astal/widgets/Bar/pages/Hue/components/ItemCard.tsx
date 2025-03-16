import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Group, Light } from "lib/hue";
import { debounce } from "utils";

interface HueItemProps {
  item: Group | Light;
}

export function ItemCard(props: HueItemProps) {
  const { item } = props;

  const onDragged = debounce((value: number) => (item.brightness = value), 100);

  return (
    <box className="hue-item" vertical>
      <box>
        <icon icon={item.icon} />
        {item.name}
        <box hexpand halign={Gtk.Align.END}>
          <switch
            active={bind(item, "on")}
            onNotifyActive={({ active }) => (item.on = active)}
          />
        </box>
      </box>

      <slider
        min={0}
        max={255}
        value={item.brightness}
        onDragged={(self) => onDragged(self.value)}
      />
    </box>
  );
}
