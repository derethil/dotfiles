import { App } from "astal/gtk3";
import Apps from "gi://AstalApps";
import { WINDOW_NAME } from "widgets/Pulse";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
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

  public readonly command: PulseCommand = ":app";
  public readonly description = "Launch Applications";
  public readonly default = true;

  public static get_default() {
    if (!this.instance) this.instance = new Applications();
    return this.instance;
  }

  public activate(app: Apps.Application) {
    app.launch();
    App.toggle_window(WINDOW_NAME);
  }

  public process(args: string[]) {
    if (args.length === 0) return [];
    const appResults = this.apps.fuzzy_query(args.join(" "));

    const results = appResults.map((app) => {
      return (
        <PulseResult handleActivate={() => app.launch()}>
          <AppButton app={app} />
        </PulseResult>
      ) as PulseResult;
    });

    return results;
  }
}
