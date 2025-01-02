import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Wrapper } from "./Wrapper";

export class PluginPowerMenu implements PulsePlugin {
  private static instance: PluginPowerMenu;

  public readonly command: PulseCommand = ":pm";
  public readonly description = "Power Management";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new PluginPowerMenu();
    return this.instance;
  }

  public process() {
    return [<Wrapper />];
  }
}
