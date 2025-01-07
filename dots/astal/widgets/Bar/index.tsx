import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { options } from "options";
import { modules } from "./modules";

export type BarModule = keyof typeof modules;

export function Bar(gdkmonitor: Gdk.Monitor) {
  const margin =
    options.bar.position.get() === "RIGHT" ? "margin-left" : "margin-right";

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
    >
      <centerbox
        vertical
        css={`
          ${margin}: 0px;
        `}
      >
        <box valign={Gtk.Align.START} halign={Gtk.Align.CENTER} vertical>
          {options.bar.modules.start((mods) =>
            mods.map((mod) => modules[mod]()),
          )}
        </box>
        <box valign={Gtk.Align.START} halign={Gtk.Align.CENTER} vertical>
          {options.bar.modules.center((mods) =>
            mods.map((mod) => modules[mod]()),
          )}
        </box>
        <box valign={Gtk.Align.END} halign={Gtk.Align.CENTER} vertical>
          {options.bar.modules.end((mods) => mods.map((mod) => modules[mod]()))}
        </box>
      </centerbox>
    </window>
  );
}
