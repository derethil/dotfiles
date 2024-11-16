import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = Variable("").poll(1000, "date +%I%M");
  App.apply_css("./bar.scss");

  return (
    <window
      name="Bar"
      widthRequest={200}
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT
      }
      application={App}
      onDestroy={() => time.drop()}
    >
      <centerbox vertical>
        <box />
        <box />
        <button onClicked="echo hello" halign={Gtk.Align.CENTER}>
          {time()}
        </button>
      </centerbox>
    </window>
  );
}
