import Widget from "resource:///com/github/Aylur/ags/widget.js";
import GLib from "gi://GLib";
import { Props as LabelProps } from "types/widgets/label";

interface ClockProps extends LabelProps {
  format: string;
  interval?: number;
}

export default ({ format, interval = 1000, ...rest }: ClockProps) =>
  Widget.Label({
    class_name: "clock",
    hexpand: true,
    hpack: "center",
    ...rest,
    setup: (self) =>
      self.poll(interval, () => {
        self.label =
          GLib.DateTime.new_now_local().format(format) || "wrong format";
      }),
  });
