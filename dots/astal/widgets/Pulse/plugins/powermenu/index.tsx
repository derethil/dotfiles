import { Fzf } from "fzf";
import { PluginOptions, PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Action } from "./Action";
import { PowerActions } from "./actions";

export class PowerMenu implements PulsePlugin {
  private static instance: PowerMenu;

  public readonly command: PulseCommand;
  public readonly description = "Power Management";
  public readonly default = false;

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new PowerMenu(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }

  public process(args: string[]) {
    const fzf = new Fzf(PowerActions, {
      selector: (action) => action.label,
    });

    return fzf.find(args.join(" ")).map(({ item }) => <Action {...item} />);
  }
}
