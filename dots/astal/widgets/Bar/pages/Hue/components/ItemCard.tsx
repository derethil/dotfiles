import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { Group, Light } from "lib/hue";
import { options } from "options";
import { attach, debounce } from "utils";
import { hexToRGB } from "utils/color";

interface HueItemProps {
  item: Group | Light;
}

export function ItemCard(props: HueItemProps) {
  const { item } = props;

  const onDragged = debounce((value: number) => (item.brightness = value), 100);

  const values = Variable.derive([bind(item, "brightness"), bind(item, "on")]);

  const background = values().as(([brightness, on]) => {
    if (on) return createLinearGradient(brightness);
    return options.theme.color.background.muted.get();
  });

  const bright = values().as(([brightness, on]) => {
    if (on) return brightness >= 96;
    return on;
  });

  return (
    <box
      className="hue-item"
      vertical
      css={background.as((gradient) => `background: ${gradient};`)}
      setup={(self) => {
        const unsub = attach(bright, (bright) => self.toggleClassName("bright", bright));
        self.connect("destroy", unsub);
      }}
    >
      <box>
        <icon icon={item.icon} />
        {item.name}
        <box hexpand halign={Gtk.Align.END}>
          <switch
            cursor="pointer"
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
        cursor="pointer"
      />
    </box>
  );
}

function createLinearGradient(brightness: number) {
  const from = hexToRGB("#c7aa5b");
  const to = hexToRGB("#574b2b");

  const end = from.map((start, i) => {
    const end = to[i];
    return Math.round(start + ((end - start) * (255 - brightness)) / 255);
  });

  const fromRGB = `rgb(${from.join(", ")})`;
  const endRGB = `rgb(${end.join(", ")})`;
  const maxRGB = `rgb(${to.join(", ")})`;

  const min = 20;
  const max = 75;
  const percent = Math.min(max, Math.max(min, Math.round((brightness / 255) * 100)));

  return `linear-gradient(to bottom, ${fromRGB} 0%, ${endRGB} ${percent}%, ${maxRGB} 100%)`;
}
