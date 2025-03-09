import AstalApps from "gi://AstalApps";
import { options } from "options";
import { ButtonGroup } from "./ButtonGroup";

export function Pinned() {
  const Apps = new AstalApps.Apps({ nameMultiplier: 10 });

  const pinned = options.dock.pinned();
  const apps = pinned.as((terms) =>
    terms
      .map((term) => ({ app: Apps.fuzzy_query(term)?.[0], term }))
      .filter(({ app }) => app),
  );

  return <ButtonGroup apps={apps} pinned />;
}
