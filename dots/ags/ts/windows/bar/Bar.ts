import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "ts/options.js";

// Bar Widgets
import Workspaces from "./modules/Workspaces";
import Clock from "./modules/Clock";
import Powermenu from "./modules/Powermenu";
import Weather from "./modules/Weather";
import SystemTray from "./modules/SystemTray";
import Audio from "./modules/Audio";
import MprisControls from "./modules/MprisControls";
import DashboardButton from "./modules/DashboardButton";
import Battery from "./modules/Battery";
import Backlight from "./modules/Backlight";

const Start = () =>
  Widget.Box({
    class_name: "start",
    vpack: "start",
    hexpand: true,
    vertical: true,
    children: [DashboardButton(), Workspaces(), SystemTray(), MprisControls()],
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
      Backlight(),
      Weather(),
      Audio(),
      Battery(),
      Clock(),
      Powermenu(),
    ],
  });

export default (monitor: number) =>
  Widget.Window({
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    class_name: "transparent",
    width_request: options.bar.width.value,
    monitor,
    anchor: options.bar.position
      .bind("value")
      .transform((v) => ["top", v, "bottom"]),
    child: Widget.CenterBox({
      vertical: true,
      class_name: `panel`,
      start_widget: Start(),
      center_widget: Center(),
      end_widget: End(),
    }),
  });
