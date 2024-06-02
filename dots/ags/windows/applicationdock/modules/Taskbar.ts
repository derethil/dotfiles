import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { focusClient, killClient } from "../appUtils";
import { AppButton } from "./AppButton";

const Hyprland = await Service.import("hyprland");
const Applications = await Service.import("applications");

export function Taskbar() {
  return Widget.Box({
    children: Hyprland.bind("clients").transform((clients) =>
      clients.map((client) => {
        for (const appName of options.docks.pinnedApps.value) {
          if (client.class.toLowerCase().includes(appName.toLowerCase())) {
            return null;
          }
        }

        for (const app of Applications.list) {
          if (
            client.title && app.match(client.title) ||
            client.class && app.match(client.class)
          ) {
            return AppButton({
              icon: app.icon_name ?? "",
              tooltipText: app.name,
              onPrimaryClick: () => focusClient(client),
              onSecondaryClick: () => killClient(client),
              onMiddleClick: () => {
                app.launch();
                app.frequency++;
              },
            });
          }
        }
      }).filter(Boolean) as Gtk.Widget[]
    ),
  });
}
