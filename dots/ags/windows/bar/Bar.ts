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

export type BarWidget = keyof typeof widgets;

const widgets = {
  battery: Battery,
  backlight: Backlight,
  clock: Clock,
  dashboard: DashboardButton,
  powermenu: Powermenu,
  systemTray: SystemTray,
  weather: Weather,
  workspaces: Workspaces,
  audio: Audio,
  media: MprisControls,
  expander: () => Widget.Box({ expand: true }),
};

const { start, center, end } = options.bar.layout;
const { position } = options.bar;
export default (monitor: number) =>
  Widget.Window({
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    monitor,
    class_name: "bar",
    anchor: position.bind().as((v) => ["top", v, "bottom"]),
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      vertical: true,
      start_widget: Widget.Box({
        vertical: true,
        vpack: "start",
        expand: true,
        children: start.bind().as((v) => v.map((w) => widgets[w]())),
      }),

      center_widget: Widget.Box({
        vertical: true,
        vpack: "center",
        children: center.bind().as((v) => v.map((w) => widgets[w]())),
      }),

      end_widget: Widget.Box({
        vertical: true,
        vpack: "end",
        expand: true,
        children: end.bind().as((v) => v.map((w) => widgets[w]())),
      }),
    }),
  });
