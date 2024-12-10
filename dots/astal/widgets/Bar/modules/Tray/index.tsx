import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import AstalTray from "gi://AstalTray";
import { options } from "options";
import { TrayItem } from "./TrayItem";

export function Tray() {
  const tray = AstalTray.Tray.get_default();
  const hidden = options.bar.tray.hidden((list) => new Set(list));

  const items = Variable.derive([hidden, bind(tray, "items")], (hidden, items) => {
    const filterFn = (item: AstalTray.TrayItem) => {
      if (!item.gicon) return false;
      if (hidden.has(item.title)) return false;
      return true;
    };

    return items.filter(filterFn);
  });

  return (
    <box vertical halign={Gtk.Align.CENTER} className="tray" hexpand>
      {items((items) => items.map((item) => <TrayItem item={item} />))}
    </box>
  );
}
