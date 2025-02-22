import { App } from "astal/gtk3";
import { OverlayType } from "state/overlay";
import { Bar } from "./Bar";
import { Corners } from "./Corners";
import { Overlay } from "./Overlay";
import { Pulse } from "./Pulse";

export function widgets() {
  App.get_monitors().map((monitor) => {
    Corners(monitor);
    Bar(monitor);
    // PopupNotifications(monitor);
  });
  Pulse();
  Object.values(OverlayType).forEach((type) => {
    Overlay({ type, className: `overlay-${type}` });
  });
}
