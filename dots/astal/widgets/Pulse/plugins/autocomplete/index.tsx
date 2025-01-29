import { Fzf } from "fzf";
import { PulseState } from "widgets/Pulse/state";
import { PluginEntry } from "./PluginEntry";
import { PluginOptions, PulseCommand, PulsePlugin } from "../../types";

export class PulseAutocomplete implements PulsePlugin {
  private static instance: PulseAutocomplete;

  public readonly command: PulseCommand;
  public readonly description = "View Commands";
  public readonly default = false;

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new PulseAutocomplete(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }

  public process(args: string[]) {
    const all = PulseState.get_default().plugins.filter(
      ({ command }) => command !== this.command,
    );

    const fzf = new Fzf(all, {
      selector: (p) => `${p.command} ${p.description}`,
    });

    return fzf
      .find(args.join(" "))
      .map(({ item }) => <PluginEntry plugin={item} />);
  }
}
