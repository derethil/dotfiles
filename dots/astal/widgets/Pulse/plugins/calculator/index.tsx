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
    if (expression === "") return "";
    return bash(`qalc "${expression}"`);
  }

  public searchAdornment() {
    return <icon icon="math-symbolic" />;
  }

  public async process(args: string[]) {
    const result = await this.calculate(args.join(" "));
    return [
      <box className="pulse-result calculator" hexpand>
        <label label={result} hexpand halign={Gtk.Align.CENTER} />
      </box>,
    ];
  }
}
