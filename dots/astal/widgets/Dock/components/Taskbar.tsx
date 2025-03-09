import { bind, Variable } from "astal";
import { Astal } from "astal/gtk3";
import AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland";
import { options } from "options";
import { createClickHandler } from "utils/binds";
import { AppButton } from "./AppButton";
import { matchClient } from "../util/matchClient";

interface AppClient {
  app: AstalApps.Application;
  client: AstalHyprland.Client;
}

export function Taskbar() {
  const hypr = AstalHyprland.get_default();
  const Applications = new AstalApps.Apps({ nameMultiplier: 10 });

  const getAppFromClient = (client: AstalHyprland.Client) => {
    let app = Applications.fuzzy_query(client.title)?.[0];
    if (app) return app;
    app = Applications.fuzzy_query(client.class)?.[0];
    if (app) return app;
    return null;
  };

  const clients = Variable.derive([bind(hypr, "clients"), options.dock.pinned()])().as(
    ([clients, pinned]) => {
      return clients
        .map((client) => {
          if (pinned.some((term) => matchClient(client, term))) return null;
          const app = getAppFromClient(client);
          if (!app) return null;
          return { app, client };
        })
        .filter(Boolean) as AppClient[];
    },
  );

  const handleSecondaryClick = (term: string) => {
    const client = hypr.clients.find((c) => matchClient(c, term));
    client?.kill();
  };

  const handlePrimaryClick = (app: AstalApps.Application, term: string) => {
    const client = hypr.clients.find((c) => matchClient(c, term));
    if (client) client.focus();
    else app.launch();
  };

  return (
    <>
      {clients.as((clients) =>
        clients.map(({ app, client }) => {
          return (
            <AppButton
              pinned={false}
              term={client.title}
              icon={app.iconName ?? ""}
              tooltipText={app.name}
              onClick={createClickHandler(
                {
                  key: Astal.MouseButton.PRIMARY,
                  action: () => handlePrimaryClick(app, client.title),
                },
                {
                  key: Astal.MouseButton.SECONDARY,
                  action: () => handleSecondaryClick(client.title),
                },
                {
                  key: Astal.MouseButton.MIDDLE,
                  action: () => app.launch(),
                },
              )}
            />
          );
        }),
      )}
    </>
  );
}
