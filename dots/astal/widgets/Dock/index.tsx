import { Variable } from "astal";
import { Astal, Gdk, Gtk } from "astal/gtk3";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { options } from "options";
import { Pinned } from "./components/Pinned";
import { Taskbar } from "./components/Taskbar";

export function Dock(monitor: Gdk.Monitor) {
  const hypr = AstalHyprland.get_default();
  const reveal = Variable(false);

  const setRevealState = (shouldReveal: boolean) => {
    const workspace = hypr.focusedWorkspace;
    if (workspace?.clients.length === 0 && !shouldReveal) return;
    reveal.set(shouldReveal);
  };

  const onClientUpdate = () => {
    if (hypr.focusedMonitor.model !== monitor.model) return;
    if ((hypr.focusedWorkspace?.clients.length ?? 0) === 0) setRevealState(true);
  };

  const connections = [
    hypr.connect("client-added", onClientUpdate),
    hypr.connect("client-removed", onClientUpdate),
    hypr.connect("notify::focusedWorkspace", onClientUpdate),
  ];

  return (
    <window
      gdkmonitor={monitor}
      name="Dock"
      className="Dock"
      anchor={Astal.WindowAnchor.BOTTOM}
      onDestroy={() => {
        reveal.drop();
        connections.forEach((c) => hypr.disconnect(c));
      }}
    >
      <eventbox onHoverLost={() => setRevealState(false)}>
        <box vertical>
          <eventbox onHover={() => setRevealState(true)}>
            <revealer
              revealChild={reveal()}
              transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
              transitionDuration={options.theme.transition()}
            >
              <box className="content">
                <Pinned />
                <Taskbar />
              </box>
            </revealer>
          </eventbox>
        </box>
      </eventbox>
    </window>
  );
}
