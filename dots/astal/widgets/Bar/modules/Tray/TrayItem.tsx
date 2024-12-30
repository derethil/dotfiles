import { bind } from "astal";
import { App, Gtk, Gdk, Astal } from "astal/gtk3";
import AstalTray from "gi://AstalTray";

interface Props {
  item: AstalTray.TrayItem;
}

export function TrayItem({ item }: Props) {
  if (item.iconThemePath) App.add_icons(item.iconThemePath);

  const menu = item.create_menu();

  const handleClick = (self: Gtk.Button, event: Astal.ClickEvent) => {
    if (event.button === Gdk.BUTTON_PRIMARY) {
      item.activate(0, 0);
    } else {
      menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null);
    }
  };

  return (
    <button
      halign={Gtk.Align.CENTER}
      tooltipMarkup={bind(item, "tooltipMarkup")}
      hasTooltip
      onDestroy={() => menu?.destroy()}
      onClick={handleClick}
    >
      <icon gicon={bind(item, "gicon").as((gicon) => gicon)} />
    </button>
  );
}
