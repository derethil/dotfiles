import { icons } from "lib/icons";
import { DockButton } from "../DockButton";
import { bash } from "lib/utils";

import { ArchUpdate } from "services/archupdate";

const openArchUpdate = () => bash("footclient --title 'terminal-arch-update' arch-update -d");

function UpdatesLabel() {
  return Widget.Label({
    label: ArchUpdate.bind("updates").as((u) => u.toString()),
  });
}

function UpdatesButton() {
  return DockButton({
    icon: icons.system.updates,
    tooltip: "Package Updates",
    handlePrimaryClick: openArchUpdate,
  });
}

export function UpdatesModule() {
  return Widget.Revealer({
    transition: "slide_right",
    revealChild: ArchUpdate.bind("status").as((s) => s === "updates-available"),
    child: Widget.Box({
      className: "dock-module",
      children: [
        Widget.Separator({
          vpack: "center",
          hpack: "center",
        }),
        Widget.Box({
          className: "updates",
          children: [UpdatesButton(), UpdatesLabel()],
        }),
      ],
    }),
  });
}
