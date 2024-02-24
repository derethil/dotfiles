// Bar Widgets
import { Workspaces } from "./modules/Workspaces";
import { Clock } from "./modules/Clock";
import { Powermenu } from "./modules/Powermenu";
import { Weather } from "./modules/Weather";
import { SystemTray } from "./modules/SystemTray";
import { AudioModule } from "./modules/Audio";
import { MediaControls } from "./modules/MediaControls";
import { DashboardButton } from "./modules/DashboardButton";
import { BatteryModule } from "./modules/Battery";
import { Backlight } from "./modules/Backlight";

export type BarWidget = keyof typeof widgets;

const widgets = {
  battery: BatteryModule,
  backlight: Backlight,
  clock: Clock,
  dashboard: DashboardButton,
  powermenu: Powermenu,
  systemTray: SystemTray,
  weather: Weather,
  workspaces: Workspaces,
  audio: AudioModule,
  media: MediaControls,
  expander: () => Widget.Box({ expand: true }),
};

const { start, center, end } = options.bar.layout;
const { position } = options.bar;
export function Bar(monitor: number) {
  return Widget.Window({
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
}