// Bar Widgets
import { AudioModule } from "./modules/Audio";
import { Backlight } from "./modules/Backlight";
import { BatteryModule } from "./modules/Battery";
import { Clock } from "./modules/Clock";
import { MediaControls } from "./modules/MediaControls";
import { Powermenu } from "./modules/Powermenu";
import { SystemTray } from "./modules/SystemTray";
import { Weather } from "./modules/Weather";
import { WindowButton } from "./modules/WindowButton";
import { Workspaces } from "./modules/Workspaces";

export type BarWidget = keyof typeof widgets;

const widgets = {
  battery: BatteryModule,
  backlight: Backlight,
  clock: Clock,
  window: WindowButton,
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

export const Bar = (monitor: number) => {
  return Widget.Window({
    name: `bar${monitor}`,
    exclusivity: "exclusive",
    monitor,
    className: "bar",
    anchor: position.bind().as((v) => ["top", v, "bottom"]),
    child: Widget.CenterBox({
      css: "min-width: 2px; min-height: 2px;",
      vertical: true,
      startWidget: Widget.Box({
        className: "bar-start",
        vertical: true,
        vpack: "start",
        expand: true,
        children: start.bind().as((v) => v.map((w) => widgets[w]())),
      }),
      centerWidget: Widget.Box({
        vertical: true,
        vpack: "center",
        children: center.bind().as((v) => v.map((w) => widgets[w]())),
      }),
      endWidget: Widget.Box({
        className: "bar-end",
        vertical: true,
        vpack: "end",
        expand: true,
        children: end.bind().as((v) => v.map((w) => widgets[w]())),
      }),
    }),
  });
};
