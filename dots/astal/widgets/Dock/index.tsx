import { bind, Variable } from "astal";
import { Astal, Gdk, Gtk } from "astal/gtk3";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { options } from "options";
import { Pinned } from "./Pinned";

export function Dock(monitor: Gdk.Monitor) {
  const hypr = AstalHyprland.get_default();
  const reveal = Variable(false);

  const handleReveal = (shouldReveal: boolean) => {
    const workspace = hypr.focusedWorkspace;
    if (workspace?.clients.length === 0 && !shouldReveal) return;
    reveal.set(shouldReveal);
  };

  const checkReveal = () => {
    if (hypr.focusedMonitor.model !== monitor.model) return;
    if ((hypr.focusedWorkspace?.clients.length ?? 0) === 0) handleReveal(true);
  };

  const disconnects = [
    () => hypr.disconnect(hypr.connect("client-added", checkReveal)),
    () => hypr.disconnect(hypr.connect("client-removed", checkReveal)),
    bind(hypr, "focusedWorkspace").subscribe(() => checkReveal()),
  ];

  return (
    <window
      gdkmonitor={monitor}
      name="Dock"
      className="Dock"
      anchor={Astal.WindowAnchor.BOTTOM}
      onDestroy={() => {
        reveal.drop();
        disconnects.forEach((disconnect) => disconnect());
      }}
    >
      <eventbox onHoverLost={() => handleReveal(false)}>
        <box vertical>
          <eventbox onHover={() => handleReveal(true)}>
            <revealer
              revealChild={reveal()}
              transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
              transitionDuration={options.theme.transition()}
            >
              <box className="content">
                <Pinned />
              </box>
            </revealer>
          </eventbox>
        </box>
      </eventbox>
    </window>
  );
}
