import { PluginOptions, PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { TemperatureSliders } from "./TemperatureSliders";
import { ToggleSunset } from "./ToggleSunset";

export class Sunset implements PulsePlugin {
  private static instance: Sunset;

  public readonly command: PulseCommand;
  public readonly description = "Temperature Control";
  public readonly default = false;

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new Sunset(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }

  public process() {
    return [<TemperatureSliders />];
  }

  public searchAdornment() {
    return <ToggleSunset />;
  }
}
