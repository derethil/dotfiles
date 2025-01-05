import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Wrapper } from "./Wrapper";

export class PowerMenu implements PulsePlugin {
  private static instance: PowerMenu;

  public readonly command: PulseCommand = ":pm";
  public readonly description = "Power Management";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new PowerMenu();
    return this.instance;
  }

  public process() {
    return [<Wrapper />];
  }
}
