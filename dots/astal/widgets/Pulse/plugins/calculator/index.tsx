import { Gtk } from "astal/gtk3";
import { bash } from "utils";
import { PluginOptions, PulseCommand, PulsePlugin } from "widgets/Pulse/types";

export class Calculate implements PulsePlugin {
  private static instance: Calculate;

  public readonly command: PulseCommand;
  public readonly description = "Quick Access Calculator";
  public readonly default = false;

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new Calculate(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }
  private calculate(expression: string) {
    return bash(`echo "${expression}" | bc -l`);
  }

  public searchAdornment() {
    return <icon icon="math-symbolic" />;
  }

  public async process(args: string[]) {
    const result = Number(await this.calculate(args.join(" ")));
    const rounded = Math.round(result * 1000) / 1000;
    return [
      <box className="pulse-result calculator" hexpand>
        <label label={String(rounded)} hexpand halign={Gtk.Align.CENTER} />
      </box>,
    ];
  }
}
