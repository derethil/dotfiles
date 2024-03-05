import Gtk from "gi://Gtk?version=3.0";
import { LabelProps } from "types/widgets/label";

export function FontIcon<Attr extends { size: number }>(
  props: LabelProps<Attr> = {}
) {
  const { setup, ...rest } = props;
  return Widget.Label<Attr>({
    // @ts-ignore
    attribute: { size: 0 },
    hpack: "center",
    vpack: "center",
    setup: (self) => {
      // Class
      self.toggleClassName("font-icon");

      // Gtk Settings
      self.attribute.size = self
        .get_style_context()
        .get_property("font-size", Gtk.StateFlags.NORMAL);

      self.vfunc_get_preferred_height = () => [
        self.attribute.size,
        self.attribute.size,
      ];
      self.vfunc_get_preferred_width = () => [
        self.attribute.size,
        self.attribute.size,
      ];

      setup?.(self);
    },
    ...rest,
  });
}
