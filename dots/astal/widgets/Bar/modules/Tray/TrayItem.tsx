import { bind } from "astal";
import { App, Gtk } from "astal/gtk3";
import AstalTray from "gi://AstalTray";

interface Props {
  item: AstalTray.TrayItem;
}

export function TrayItem({ item }: Props) {
  if (item.iconThemePath) App.add_icons(item.iconThemePath);

  return (
    <menubutton
      tooltipMarkup={bind(item, "tooltipMarkup")}
      usePopover={false}
      actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
      menuModel={bind(item, "menuModel")}
      halign={Gtk.Align.CENTER}
    >
      <icon gicon={bind(item, "gicon").as((gicon) => gicon)} />
    </menubutton>
  );
}
