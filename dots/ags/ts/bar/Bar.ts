import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "../options.js";

// Bar Widgets
import Workspaces from "./modules/Workspaces";
import Clock from "./modules/Clock";
import Powermenu from "./modules/Powermenu";
import Weather from "./modules/Weather";
import SystemTray from "./modules/SystemTray";
import Audio from "./modules/Audio";
import MprisControls from "./modules/MprisControls";
import DashboardButton from "./modules/DashboardButton";
// import Battery from "./modules/Battery.js";

const Start = () =>
  Widget.Box({
    class_name: "start",
    vpack: "start",
    hexpand: true,
    vertical: true,
    children: [DashboardButton(), Workspaces(), MprisControls()],
  });

const Center = () =>
  Widget.Box({
    class_name: "center",
    vpack: "center",
    hexpand: true,
    vertical: true,
    children: [],
  });

const End = () =>
  Widget.Box({
    class_name: "end",
    vpack: "end",
    hexpand: true,
    vertical: true,
    children: [Weather(), Audio(), Clock(), SystemTray(), Powermenu()],
  });

export default (monitor: number) =>
  Widget.Window({
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    class_name: "transparent",
    width_request: options.bar.width.value,
    monitor,
    anchor: [
      "top",
      options.bar.position.value === "left" ? "left" : "right",
      "bottom",
    ],
    child: Widget.CenterBox({
      vertical: true,
      class_name: `panel`,
      start_widget: Start(),
      center_widget: Center(),
      end_widget: End(),
    }),
  });
