import { Client } from "types/service/hyprland";
import { focusClient, killClient } from "../appUtils";
import { AppButton } from "./AppButton";

const Applications = await Service.import("applications");
const Hyprland = await Service.import("hyprland");

const matchClient = (client: Client, term: string) => {
  if (client.class.toLowerCase().includes(term)) return true;
  if (client.title.toLowerCase().includes(term)) return true;
  if (client.initialTitle.toLowerCase().includes(term)) return true;
  return false;
};

export function Pinned() {
  return Widget.Box({
    className: "pins",
    homogeneous: true,
    children: options.docks.pinnedApps.bind().transform((terms) =>
      terms
        .map((term) => ({ app: Applications.query(term)?.[0], term }))
        .filter(({ app }) => app)
        .map(({ app, term }) =>
          AppButton({
            pinned: true,
            icon: app.icon_name || "",
            tooltipText: app.name,
            onSecondaryClick: () => {
              const client = Hyprland.clients.find((c) => matchClient(c, term));
              if (client) killClient(client);
            },
            onPrimaryClick: () => {
              for (const client of Hyprland.clients) {
                if (matchClient(client, term)) return focusClient(client);
              }
              app.launch();
            },
            onMiddleClick: () => app.launch(),
            setup: (self) =>
              self.hook(Hyprland, () => {
                const running = Hyprland.clients.filter((client) =>
                  matchClient(client, term)
                );

                const focused = running.find((client) =>
                  client.address === Hyprland.active.client.address
                );

                const indicator = (self.attribute as any).children[0];
                indicator.visible = 0 < running.length;
                indicator.toggleClassName("focused", focused !== undefined);

                self.set_tooltip_text(
                  running.length === 1 ? running[0].title : app.name,
                );
              }),
          })
        )
    ),
  });
}
