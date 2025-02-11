import { bind } from "astal";
import { Group, Light } from "lib/hue";

interface DetailsProps {
  item: Group | Light;
}
export function Details({ item }: DetailsProps) {
  return (
    <slider
      hexpand
      className="hue-brightness"
      value={item.brightness / 255}
      onButtonReleaseEvent={(self) => (item.brightness = self.value * 255)}
      setup={(self) => {
        if (item instanceof Group) return;
        item.groups.forEach((group) => {
          bind(group, "brightness").subscribe((groupBrightness) => {
            self.value = groupBrightness / 255;
          });
        });
      }}
    />
  );
}
