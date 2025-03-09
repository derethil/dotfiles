import { Binding } from "astal";
import { Astal } from "astal/gtk3";
import AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland";
import { createClickHandler } from "utils/binds";
import { AppButton } from "./AppButton";
import { matchClient } from "../util/matchClient";

export interface AppClient {
  app: AstalApps.Application;
  term: string;
}

interface Props {
  apps: Binding<AppClient[]>;
}

export function ButtonGroup(props: Props) {
  const { apps } = props;

  const hypr = AstalHyprland.get_default();

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
    <box homogeneous>
      {apps.as((apps) =>
        apps.map(({ app, term }) => (
          <AppButton
            term={term}
            icon={app.iconName ?? ""}
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
