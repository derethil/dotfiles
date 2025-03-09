import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland";
import { Separator } from "elements";
import { options } from "options";
import { AppClient, ButtonGroup } from "./ButtonGroup";
import { matchClient } from "../util/matchClient";

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

  const clients = Variable.derive([bind(hypr, "clients"), options.dock.pinned()])();

  const apps = clients.as(([clients, pinned]) =>
    clients.map((client) => {
      if (pinned.some((term) => matchClient(client, term))) return;
      const app = getAppFromClient(client);
      if (!app) return;
      return { app, term: client.title };
    }),
  );

  const filtered = apps.as((apps) => apps.filter((app) => app) as AppClient[]);

  return (
    <>
      <Separator
        orientation={Gtk.Orientation.VERTICAL}
        visible={filtered.as((filtered) => filtered.length > 0)}
      />
      <ButtonGroup apps={filtered} />
    </>
  );
}
