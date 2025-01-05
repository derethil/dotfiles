import { bash } from "utils";
import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";

export class Calculate implements PulsePlugin {
  private static instance: Calculate;

  public readonly command: PulseCommand = ":cal";
  public readonly description = "Quick Access Calculator";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new Calculate();
    return this.instance;
  }

  private calculate(expression: string) {
    return bash(`echo "${expression}" | bc -l`);
  }

  public async process(args: string[]) {
    const result = Number(await this.calculate(args.join(" ")));
    const rounded = Math.round(result * 1000) / 1000;
    return [<box className="pulse-result calculator">{rounded}</box>];
  }
}
