import { Gtk } from "astal/gtk3";
import { options } from "options";
import { Backlight } from "./Backlight";
import { Battery } from "./Battery";
import { DateTime } from "./DateTime";
import { Divider } from "./Divider";
import { Media } from "./Media";
import { SystemMonitor } from "./SystemMonitor";
import { Tools } from "./Tools";
import { Tray } from "./Tray";
import { Volume } from "./Volume";
import { Weather } from "./Weather";
import { Workspaces } from "./Workspaces";

export type BarModule = keyof typeof modules;

const modules = {
  Backlight,
  Battery,
  DateTime,
  Divider,
  Media,
  SystemMonitor,
  Tray,
  Tools,
  Volume,
  Weather,
  Workspaces,
};

const isRightAligned = options.bar.position.get() === "RIGHT";
export const margin = isRightAligned ? "margin-left" : "margin-right";

export function BarModules() {
  return (
    <centerbox
      className="bar-modules"
      vertical
      css={`
        ${margin}: 0px;
      `}
    >
      <box valign={Gtk.Align.START} halign={Gtk.Align.CENTER} vertical>
        {options.bar.modules.start((mods) => mods?.map((mod) => modules[mod]()))}
      </box>
      <box valign={Gtk.Align.START} halign={Gtk.Align.CENTER} vertical>
        {options.bar.modules.center((mods) => mods?.map((mod) => modules[mod]()))}
      </box>
      <box valign={Gtk.Align.END} halign={Gtk.Align.CENTER} vertical>
        {options.bar.modules.end((mods) => mods?.map((mod) => modules[mod]()))}
      </box>
    </centerbox>
  );
}
