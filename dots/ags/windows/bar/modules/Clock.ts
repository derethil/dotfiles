import GLib from "gi://GLib?version=2.0";
import { Clock as ClockWidget } from "widgets/Clock";
import { IconModule } from "../IconModule";

function selectClockIcon(time: GLib.DateTime): string {
  const hours = (time.get_hour() % 12) + 1;
  const returnValue = `time-${hours}`;
  console.log(returnValue);
  return returnValue;
}

const DateTime = Variable(GLib.DateTime.new_now_local(), {
  poll: [1000 * 300, () => {
    return GLib.DateTime.new_now_local();
  }],
});

export function Clock() {
  return IconModule({
    className: " clock",
    child: ClockWidget({ format: `%I\n%M` }),
    icon: Widget.Icon({
      icon: DateTime.bind("value").as((time) => selectClockIcon(time)),
      size: 24,
    }),
    labelColor: "yellow",
  });
}
