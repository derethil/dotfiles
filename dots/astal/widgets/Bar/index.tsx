import { App, Astal, Gdk } from "astal/gtk3";
import { options } from "options";
import { Time } from "state/time";
import { DateTime } from "./modules/DateTime";

export type BarModule = keyof typeof modules;

export const modules = {
  DateTime: DateTime,
};

export function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="Bar"
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={options.bar.position(
        (p) =>
          Astal.WindowAnchor.TOP |
          Astal.WindowAnchor.BOTTOM |
          Astal.WindowAnchor[p],
      )}
      application={App}
      onDestroy={() => Time.drop()}
    >
      <centerbox vertical>
        <box />
        <box />
        <box>
          {options.bar.modules.end((mods) => mods.map((mod) => modules[mod]()))}
        </box>
      </centerbox>
    </window>
  );
}
