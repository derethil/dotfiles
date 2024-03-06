import Gtk from "gi://Gtk?version=3.0";

export const openedMenu = Variable("");

App.connect("window-toggled", (_, name, visible) => {
  if (name === "dashboard" && visible) {
    Utils.timeout(500, () => (openedMenu.value = ""));
  }
});

interface MenuProps {
  name: string;
  icon: Gtk.Widget;
  title: Gtk.Widget;
  content: Gtk.Widget[];
}

export function Menu({ name, icon, title, content }: MenuProps) {
  return Widget.Revealer({
    transition: "slide_down",
    revealChild: openedMenu.bind().as((menu) => menu === name),
    child: Widget.Box({
      classNames: ["menu", name],
      vertical: true,
      children: [
        Widget.Box({
          className: "title horizontal",
          children: [icon, title],
        }),
        Widget.Separator(),
        ...content,
      ],
    }),
  });
}
