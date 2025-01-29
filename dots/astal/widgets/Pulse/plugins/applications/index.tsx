import Apps from "gi://AstalApps";
import { AppButton } from "./AppButton";
import { PulsePlugin, PulseCommand, PluginOptions } from "../../types";

export class Applications implements PulsePlugin {
  private static instance: Applications;

  public readonly command: PulseCommand;
  public readonly description = "Application Launcher";
  public readonly default = true;

  private apps = new Apps.Apps({
    nameMultiplier: 2,
    entryMultiplier: 0.05,
    executableMultiplier: 0.05,
    descriptionMultiplier: 0.1,
    keywordsMultiplier: 0,
    minScore: 0.75,
  });

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new Applications(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }

  public renderApps(apps: Apps.Application[]) {
    return apps.map((app) => <AppButton app={app} />);
  }

  public process(args: string[]) {
    if (args.length === 0) return [];
    this.apps.reload();
    const appResults = this.apps.fuzzy_query(args.join(" "));
    return this.renderApps(appResults.sort());
  }

  public searchAdornment(explicit?: boolean) {
    if (!explicit) return null;
    return <icon icon="view-grid-symbolic" className="apps-adornment" />;
  }
}
