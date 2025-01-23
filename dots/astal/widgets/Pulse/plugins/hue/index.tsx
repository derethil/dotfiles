import { Hue } from "lib/hue";
import { GroupButton } from "./GroupButton";
import { PulsePlugin, PulseCommand } from "../../types";

const hue = Hue.get_default();

export class HueControl implements PulsePlugin {
  private static instance: HueControl;

  public readonly command: PulseCommand = ":h";
  public readonly description = "Philips Hue";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new HueControl();
    return this.instance;
  }

  public process() {
    return hue.groups.map((group) => <GroupButton group={group} />);
  }
}
