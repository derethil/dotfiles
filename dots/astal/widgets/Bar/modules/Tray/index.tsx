import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import AstalTray from "gi://AstalTray";
import { Revealer } from "elements";
import { options } from "options";
import { TrayItem } from "./TrayItem";

export function Tray() {
  const tray = AstalTray.Tray.get_default();
  const hidden = options.bar.tray.hidden((list) => new Set(list));

  const items = Variable.derive(
    [hidden, bind(tray, "items")],
    (hidden, items) => {
      const filterFn = (item: AstalTray.TrayItem) => {
        if (!item.gicon) return false;
        if (hidden.has(item.title)) return false;
        return true;
      };

      return items.filter(filterFn);
    },
  );

  return (
    <Revealer
      transitionDuration={options.theme.transition()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      content={items((items) => items.map((item) => <TrayItem item={item} />))}
      wrapperProps={{
        vertical: true,
        className: "tray",
        halign: Gtk.Align.CENTER,
      }}
    />
  );
}
