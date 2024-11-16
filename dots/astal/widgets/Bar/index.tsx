import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Time } from "../../state/time";

export function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="Bar"
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT
      }
      application={App}
      onDestroy={() => Time.drop()}
    >
      <centerbox vertical>
        <box />
        <box />
        <button onClicked="echo hello" halign={Gtk.Align.CENTER}>
          <box vertical valign={Gtk.Align.END}>
            {Time((v) => v?.year)}
            {Time((v) => v?.minutes)}
          </box>
        </button>
      </centerbox>
    </window>
  );
}
