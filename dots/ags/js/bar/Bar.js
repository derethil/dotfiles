import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "../options.js";

// Bar Widgets
import Workspaces from "./buttons/Workspaces.js";
import Clock from "./buttons/Clock.js";
import Powermenu from "./buttons/Powermenu.js";
import Weather from "./buttons/Weather.js";
import DashboardButton from "./buttons/DashboardButton.js";

const Start = () =>
  Widget.Box({
    class_name: "start",
    vpack: "start",
    hexpand: true,
    vertical: true,
    children: [DashboardButton(), Workspaces()],
  });

const Center = () =>
  Widget.Box({
    class_name: "center",
    vpack: "center",
    hexpand: true,
    vertical: true,
    width_request: options.bar.width.value,
    children: [],
  });

const End = () =>
  Widget.Box({
    class_name: "end",
    vpack: "end",
    hexpand: true,
    vertical: true,
    children: [Weather(), Clock(), Powermenu()],
  });

/** @param {number} monitor */
export default (monitor) =>
  Widget.Window({
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    class_name: "transparent",
    monitor,
    anchor: [
      "top",
      options.bar.position.value === "left" ? "left" : "right",
      "bottom",
    ],
    child: Widget.CenterBox({
      // @ts-expect-error this isn't typed as a subclass of box for some reason
      vertical: true,
      class_name: `panel`,
      start_widget: Start(),
      center_widget: Center(),
      end_widget: End(),
    }),
  });
