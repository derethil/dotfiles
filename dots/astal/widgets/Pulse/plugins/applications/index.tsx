import Apps from "gi://AstalApps";
import { AppButton } from "./AppButton";
import { PulsePlugin, PulseCommand } from "../../types";

export class Applications implements PulsePlugin {
  private static instance: Applications;

  private apps = new Apps.Apps({
    nameMultiplier: 2,
    entryMultiplier: 0.05,
    executableMultiplier: 0.05,
    descriptionMultiplier: 0.1,
    keywordsMultiplier: 0,
    minScore: 0.75,
  });

  public command: PulseCommand = ":app";
  public description = "Launch Applications";
  public default = true;

  public static get_default() {
    if (!this.instance) this.instance = new Applications();
    return this.instance;
  }

  public process(args: string[]) {
    if (args.length === 0) return [];
    const appResults = this.apps.fuzzy_query(args.join(" "));

    const results = appResults.map((app) => {
      return <AppButton app={app} />;
    });

    return results;
  }
}
