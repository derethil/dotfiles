import { Astal } from "astal/gtk3";
import AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { options } from "options";
import { createClickHandler } from "utils/binds";
import { AppButton } from "./AppButton";
import { matchClient } from "../util/matchClient";

export function Pinned() {
  const hypr = AstalHyprland.get_default();
  const Apps = new AstalApps.Apps({ nameMultiplier: 10 });

  const apps = options.dock
    .pinned()
    .as((terms) =>
      terms
        .map((term) => ({ app: Apps.fuzzy_query(term)?.[0], term }))
        .filter(({ app }) => app),
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
    <box homogeneous className="pins">
      {apps.as((apps) =>
        apps.map(({ app, term }) => (
          <AppButton
            pinned
            term={term}
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
                action: () => app.launch(),
              },
            )}
          />
        )),
      )}
    </box>
  );
}
