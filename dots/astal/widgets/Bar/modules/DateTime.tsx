import { Gtk } from "astal/gtk3";
import { Time } from "state/time";

export function DateTime() {
  return (
    <box vertical valign={Gtk.Align.END} className="datetime">
      <box className="day" halign={Gtk.Align.CENTER}>
        {Time((v) => v?.abbrWeekday.toUpperCase())}
      </box>
      <box className="time" halign={Gtk.Align.CENTER} vertical>
        {Time((v) => v?.hours)}
        {Time((v) => v?.minutes)}
      </box>
      <box className="date">
        {Time((v) => v?.month)}
        {Time((v) => v?.day)}
      </box>
    </box>
  );
}
