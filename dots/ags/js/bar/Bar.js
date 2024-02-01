import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "../options.js";

// Bar Widgets
import Workspaces from "./modules/Workspaces.js";
import Clock from "./modules/Clock.js";
import Powermenu from "./modules/Powermenu.js";
import Weather from "./modules/Weather.js";
import SystemTray from "./modules/SystemTray.js";
import Volume from "./modules/Volume.js";
import MediaControls from "./modules/MediaControls.js";
import DashboardButton from "./modules/DashboardButton.js";
import Battery from "./modules/Battery.js";

const Start = () =>
  Widget.Box({
    class_name: "start",
    vpack: "start",
    hexpand: true,
    vertical: true,
    children: [DashboardButton(), Workspaces(), MediaControls()],
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
    children: [
      Weather(),
      Volume(),
      Battery(),
      Clock(false),
      SystemTray(),
      Powermenu(),
    ],
  });

/** @param {number} monitor */
export default (monitor) =>
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
