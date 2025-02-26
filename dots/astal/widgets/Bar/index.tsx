import { App, Astal, Gdk } from "astal/gtk3";
import { options } from "options";
import { Dashboard } from "./Dashboard";
import { DashboardState } from "./dashboardState";
import { BarModules } from "./modules";

export function Bar(gdkmonitor: Gdk.Monitor) {
  const dashboard = DashboardState.get_default();

  return (
    <window
      name="Bar"
      className="Bar"
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={options.bar.position(
        (p) =>
          Astal.WindowAnchor.TOP |
          Astal.WindowAnchor.BOTTOM |
          Astal.WindowAnchor[p],
      )}
      application={App}
    >
      <eventbox onHoverLost={() => (dashboard.reveal = false)}>
        <box>
          <eventbox onHover={() => (dashboard.reveal = true)} />
          <box className="bar-wrapper">
            <Dashboard />
            <BarModules />
          </box>
        </box>
      </eventbox>
    </window>
  );
}
