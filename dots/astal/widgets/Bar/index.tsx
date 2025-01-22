import { Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { options } from "options";
import { BarModules } from "./modules";

export function Bar(gdkmonitor: Gdk.Monitor) {
  const reveal = Variable(false);

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
      onDestroy={() => reveal.drop()}
    >
      <eventbox onHoverLost={() => reveal.set(false)}>
        <box>
          <eventbox onHover={() => reveal.set(true)} />
          <box className="bar-wrapper">
            <Revealer
              transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
              transitionDuration={100}
              revealChild={reveal()}
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
