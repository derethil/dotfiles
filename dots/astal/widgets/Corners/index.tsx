import { Astal, Gdk } from "astal/gtk3";
import { Corner } from "elements";

type Location = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerWindowProps {
  location: Location;
  gdkmonitor: Gdk.Monitor;
  anchor: number;
}

function CornerWindow(props: CornerWindowProps) {
  return (
    <window
      name="corner"
      gdkmonitor={props.gdkmonitor}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={props.anchor}
      clickThrough
      css="background-color: transparent;"
    >
      <Corner location={props.location} />
    </window>
  );
}

export function Corners(gdkmonitor: Gdk.Monitor) {
  CornerWindow({
    location: "top-left",
    gdkmonitor,
    anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT,
  });
  CornerWindow({
    location: "top-right",
    gdkmonitor,
    anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT,
  });
  CornerWindow({
    location: "bottom-left",
    gdkmonitor,
    anchor: Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT,
  });
  CornerWindow({
    location: "bottom-right",
    gdkmonitor,
    anchor: Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT,
  });
}
