#!/usr/bin/env -S ags -b icon-browser -c

import Gtk from "gi://Gtk?version=3.0";
import { PopupWindow } from "widgets/PopupWindow";

const IconPicker = () => {
  const selected = Widget.Label({
    css: "font-size: 1.2em;",
    label: "Click on an icon te get its name",
    selectable: true,
  });

  const flowbox = Widget.FlowBox({
    minChildrenPerLine: 7,
    rowSpacing: 12,
    columnSpacing: 12,
    vpack: "start",
    hpack: "start",
    setup: (self) => {
      self.connect("child-activated", (_, child) => {
        // @ts-expect-error
        selected.label = child.get_child()?.iconName || "";
      });

      Gtk.IconTheme.get_default()
        .list_icons(null)
        .sort()
        .map((icon) => {
          !icon.endsWith(".symbolic") &&
            self.insert(
              Widget.Icon({
                icon,
                size: 38,
              }),
              -1
            );
        });

      self.show_all();
    },
  });

  const entry = Widget.Entry({
    placeholderText: "Type to seach...",
    primaryIconName: "system-search-symbolic",
    onChange: ({ text }) =>
      flowbox.get_children().forEach((child) => {
        // @ts-expect-error
        child.visible = child.get_child().iconName.includes(text);
      }),
  });

  return Widget.Box({
    css: "padding: 30px;",
    spacing: 20,
    vertical: true,
    children: [
      entry,
      Widget.Scrollable({
        hscroll: "never",
        vscroll: "always",
        hexpand: true,
        vexpand: true,
        css: "min-width: 400px;" + "min-height: 500px;",
        child: flowbox,
      }),
      selected,
    ],
  });
};

export const IconBrowser = () => {
  return PopupWindow({
    name: "icon-browser",
    child: IconPicker(),
  });
};
