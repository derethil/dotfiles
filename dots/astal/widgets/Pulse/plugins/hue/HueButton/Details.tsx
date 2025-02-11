import { Group, Light } from "lib/hue";

interface DetailsProps {
  item: Group | Light;
}
export function Details({ item }: DetailsProps) {
  return (
    <slider
      className="hue-brightness"
      focusOnClick={false}
      hexpand
      value={item.brightness / 255}
      onButtonReleaseEvent={(self) => (item.brightness = self.value * 255)}
    />
  );
}
