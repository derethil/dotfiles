import GLib from "gi://GLib";
import { LabelProps } from "types/widgets/label";

interface ClockProps extends LabelProps {
  format: string;
  interval?: number;
}

export function Clock({ format, interval = 1000, ...rest }: ClockProps) {
  return Widget.Label({
    label: GLib.DateTime.new_now_local().format(format) || "wrong format",
    className: "clock",
    hpack: "center",
    ...rest,
    setup: (self) =>
      self.poll(interval, () => {
        self.label =
          GLib.DateTime.new_now_local().format(format) || "wrong format";
      }),
  });
}
