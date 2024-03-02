import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk?version=3.0";

interface PopupMenuProps {
  className?: string;
  options: Gtk.MenuItem[];
  content: Gtk.Widget;
  contentAnchor: Gdk.Gravity;
  optionsAnchor: Gdk.Gravity;
}

export function PopupMenu({
  className,
  options,
  content,
  contentAnchor,
  optionsAnchor,
}: PopupMenuProps) {
  const menuWidget = Widget.Menu({ children: options });
  return Widget.Button({
    class_name: "popup-menu",
    child: content,
    setup: (self) => {
      self.toggleClassName(className!, className !== undefined);
      self.on_primary_click = (_, event) => {
        menuWidget.popup_at_widget(self, contentAnchor, optionsAnchor, event);
      };
    },
  });
}
