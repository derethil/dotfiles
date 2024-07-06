import { icons } from "lib/icons";
import { DockButton } from "../DockButton";
import { bash } from "lib/utils";

import { PackageUpdates } from "services/packageupdates";

const UpdatesHook = () => {
  const { pacman_updates, aur_updates } = PackageUpdates;
  return `${pacman_updates}/${aur_updates}`;
};

export function UpdatesModule() {
  return Widget.Revealer({
    transition: "slide_right",
    setup: (self) => {
      self.hook(PackageUpdates, (_, totalUpdates) => {
        self.reveal_child = totalUpdates > 0;
      });
    },
    child: Widget.Box({
      className: "dock-module",
      children: [
        Widget.Box({
          className: "updates",
          children: [
            DockButton({
              icon: icons.system.updates,
              tooltip: "Package Updates",
              handlePrimaryClick: () =>
                bash(
                  "wezterm start --class 'wezterm-system-updater' -- arch-update -d",
                ),
            }),
            Widget.Label({
              setup: (self) =>
                self.hook(PackageUpdates, () => self.label = UpdatesHook()),
            }),
          ],
        }),
        Widget.Separator({
          vpack: "center",
          hpack: "center",
        }),
      ],
    }),
  });
}
