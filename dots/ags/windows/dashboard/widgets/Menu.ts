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

export const Menu = ({ name, icon, title, content }: MenuProps) =>
  Widget.Revealer({
    transition: "slide_down",
    reveal_child: openedMenu.bind().as((menu) => menu === name),
    child: Widget.Box({
      class_names: ["menu", name],
      vertical: true,
      children: [
        Widget.Box({
          class_name: "title horizontal",
          children: [icon, title],
        }),
        Widget.Separator(),
        ...content,
      ],
    }),
  });
