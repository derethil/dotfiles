import { bind } from "astal";
import { Astal } from "astal/gtk3";
import AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { options } from "options";
import { createClickHandler } from "utils/binds";
import { AppButton } from "./AppButton";
import { IndicatedButton } from "./IndicatedButton";

const pinnedAppNames = options.dock.pinned();

function matchClient(client: AstalHyprland.Client, term: string) {
  if (client.class.toLowerCase().includes(term)) return true;
  if (client.title.toLowerCase().includes(term)) return true;
  if (client.initialTitle.toLowerCase().includes(term)) return true;
  return false;
}

function handleMiddleClick(app: AstalApps.Application) {
  return app.launch();
}

function handlePrimaryClick(app: AstalApps.Application, term: string) {
  const hypr = AstalHyprland.get_default();
  const client = hypr.clients.find((c) => matchClient(c, term));
  if (client) {
    client.focus();
  } else {
    app.launch();
  }
}

function handleSecondaryClick(term: string) {
  const hypr = AstalHyprland.get_default();
  const client = hypr.clients.find((c) => matchClient(c, term));
  client?.kill();
}

export function Pinned() {
  const hypr = AstalHyprland.get_default();
  const Apps = new AstalApps.Apps({ nameMultiplier: 10 });

  const apps = pinnedAppNames.as((terms) =>
    terms
      .map((term) => ({ app: Apps.fuzzy_query(term)?.[0], term }))
      .filter(({ app }) => app),
  );

  const handleUpdate = (self: IndicatedButton, term: string) => {
    const running = hypr.clients.filter((c) => matchClient(c, term));
    // const focused = running.find((c) => c.address === hypr.focusedClient.address);
    const indicator = self.indicator;

    indicator.visible = running.length > 0;

    const text = running.length === 1 ? running[0].title : self.tooltipText;
    self.set_tooltip_text(text);
  };

  return (
    <box homogeneous className="pins">
      {apps.as((apps) =>
        apps.map(({ app, term }) => (
          <AppButton
            pinned
            icon={app.iconName || ""}
            tooltipText={app.name}
            onClick={createClickHandler(
              {
                key: Astal.MouseButton.PRIMARY,
                action: () => handlePrimaryClick(app, term),
              },
              {
                key: Astal.MouseButton.SECONDARY,
                action: () => handleSecondaryClick(term),
              },
              {
                key: Astal.MouseButton.MIDDLE,
                action: () => handleMiddleClick(app),
              },
            )}
            setup={(self) => {
              const b = self as IndicatedButton;
              const conns = [
                hypr.connect("client-added", () => handleUpdate(b, term)),
                hypr.connect("client-removed", () => handleUpdate(b, term)),
              ];

              const unsub = bind(hypr, "focusedClient").subscribe(() =>
                handleUpdate(b, term),
              );

              self.connect("destroy", () => {
                conns.forEach((c) => hypr.disconnect(c));
                unsub();
              });
            }}
          />
        )),
      )}
    </box>
  );
}
