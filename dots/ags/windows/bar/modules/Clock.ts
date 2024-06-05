import GLib from "gi://GLib?version=2.0";
import { Clock as ClockWidget } from "widgets/Clock";
import { IconModule } from "../IconModule";

function selectClockIcon(time: GLib.DateTime): string {
  const hours = (time.get_hour() % 12) + 1;
  return `time-${hours}`;
}

const DateTime = Variable(GLib.DateTime.new_now_local(), {
  poll: [1000 * 300, () => {
    return GLib.DateTime.new_now_local();
  }],
});

export function Clock() {
  return Widget.EventBox({
    cursor: "pointer",
    onPrimaryClick: () => App.toggleWindow("calendar"),
    child: IconModule({
      child: ClockWidget({ format: options.bar.date.format.value }),
      icon: Widget.Icon({
        icon: DateTime.bind("value").as((time) => selectClockIcon(time)),
        size: 24,
      }),
      labelColor: "yellow",
    }),
  });
}
