import { PopupWindow } from "widgets/PopupWindow";
import { Header } from "./modules/header/Header";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

export const DashboardOverlays = Variable<Gtk.Widget[]>([]);
DashboardOverlays;

export function Dashboard() {
  return PopupWindow({
    name: "dashboard",
    layout: "center",
    transition: "slide_up",
    child: Widget.Overlay({
      overlays: DashboardOverlays.bind(),
      passThrough: true,
      child: Widget.Box({
        css: "min-width: 800px; min-height: 500px;",
        vertical: true,
        vpack: "start",
        hexpand: true,
        children: [Header()],
      }),
    }),
  });
}
