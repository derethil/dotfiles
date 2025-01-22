import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { options } from "options";
import { BarModules } from "./modules";

export function Bar(gdkmonitor: Gdk.Monitor) {

  return (
    <window
      name="Bar"
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={options.bar.position(
        (p) =>
          Astal.WindowAnchor.TOP |
          Astal.WindowAnchor.BOTTOM |
          Astal.WindowAnchor[p],
      )}
      application={App}
    >
          <BarModules />
        </box>
    </window>
  );
}
