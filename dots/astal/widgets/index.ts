import { App, Gtk } from "astal/gtk3";
import { OverlayType } from "state/overlay";
import { Bar } from "./Bar";
import * as Corners from "./Corners";
import { Dock } from "./Dock";
import { Overlay } from "./Overlay";
import { PopupNotifications } from "./PopupNotifications";
import { Pulse } from "./Pulse";

const PerMonitorWidgets = [
  Bar,
  Corners.TopLeftCorner,
  Corners.TopRightCorner,
  Corners.BottomLeftCorner,
  Corners.BottomRightCorner,
  PopupNotifications,
  Dock,
];

const SingleWidgets = [
  Pulse,
  ...Object.values(OverlayType).map(
    (type) => () => Overlay({ type, className: `overlay-${type}` }),
  ),
];

function createWidgets() {
  const widgets: Gtk.Widget[] = [];

  App.get_monitors().forEach((monitor) => {
    widgets.push(...PerMonitorWidgets.flatMap((widget) => widget(monitor)));
  });

  widgets.push(...SingleWidgets.flatMap((widget) => widget()));

  widgets.forEach((widget) => {
    App.add_window(widget as Gtk.Window);
  });

  return widgets;
}

export function widgets() {
  let widgets = createWidgets();
  App.connect("notify::monitors", () => {
    widgets.forEach((widget) => widget.destroy());
    widgets = createWidgets();
  });
}
