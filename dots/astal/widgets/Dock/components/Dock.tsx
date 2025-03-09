import { Variable } from "astal";
import { Astal, Gdk, Gtk } from "astal/gtk3";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { Separator } from "elements";
import { options } from "options";
import { OverviewButton } from "./OverviewButton";
import { Pinned } from "./Pinned";
import { Taskbar } from "./Taskbar";

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
    else setRevealState(false);
  };

  const connections = [
    hypr.connect("client-added", onClientUpdate),
    hypr.connect("client-removed", onClientUpdate),
    hypr.connect("notify::focused-workspace", onClientUpdate),
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
                <OverviewButton />
                <Separator orientation={Gtk.Orientation.VERTICAL} />
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
