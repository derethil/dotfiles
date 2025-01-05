import { Fzf } from "fzf";
import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Action } from "./Action";
import { PowerActions } from "./actions";

export class PowerMenu implements PulsePlugin {
  private static instance: PowerMenu;

  public readonly command: PulseCommand = ":p";
  public readonly description = "Power Management";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new PowerMenu();
    return this.instance;
  }

  public process(args: string[]) {
    const fzf = new Fzf(PowerActions, {
      selector: (action) => action.label,
    });

    return fzf.find(args.join(" ")).map(({ item }) => <Action {...item} />);
  }
}
