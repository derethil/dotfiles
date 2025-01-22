import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { options } from "options";
import { DashboardState } from "./dashboardState";
import { DashboardPage } from "./elements/DashboardPage";
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
            <Revealer
              transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
              transitionDuration={options.theme.transition()}
              revealChild={bind(dashboard, "reveal")}
            >
              <box className="dashboard" vertical widthRequest={350}>
                hi
              </box>
            </Revealer>
            <BarModules />
          </box>
        </box>
      </eventbox>
    </window>
  );
}
