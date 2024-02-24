import GLib from "gi://GLib";
import { Props as LabelProps } from "types/widgets/label";

interface ClockProps extends LabelProps {
  format: string;
  interval?: number;
}

export function Clock({ format, interval = 1000, ...rest }: ClockProps) {
  return Widget.Label({
    label: GLib.DateTime.new_now_local().format(format) || "wrong format",
    class_name: "clock",
    hpack: "center",
    ...rest,
    setup: (self) =>
      self.poll(interval, () => {
        self.label =
          GLib.DateTime.new_now_local().format(format) || "wrong format";
      }),
  });
}
