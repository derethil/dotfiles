import { App, Astal, Gdk } from "astal/gtk3";
import { options } from "options";
import { Dashboard } from "./Dashboard";
import { BarModules } from "./modules";

export function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="Bar"
      className="Bar"
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={options.bar.position(
        (p) => Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor[p],
      )}
      application={App}
    >
      <box className="bar-wrapper">
        <Dashboard />
        <BarModules />
      </box>
    </window>
  );
}
