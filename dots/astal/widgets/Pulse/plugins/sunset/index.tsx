import { Slider } from "astal/gtk3/widget";
import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { ToggleSunset } from "./ToggleSunset";

export class Sunset implements PulsePlugin {
  private static instance: Sunset;

  public readonly command: PulseCommand = ":s";
  public readonly description = "Temperature Control";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new Sunset();
    return this.instance;
  }

  public process() {
    return [<Slider></Slider>];
  }

  public searchAdornment() {
    return <ToggleSunset />;
  }
}
