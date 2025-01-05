import { Fzf } from "fzf";
import { PulseState } from "widgets/Pulse/state";
import { PluginEntry } from "./PluginEntry";
import { PulseCommand, PulsePlugin } from "../../types";

export class PulseAutocomplete implements PulsePlugin {
  private static instance: PulseAutocomplete;

  public readonly command: PulseCommand = ":";
  public readonly description = "View Commands";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new PulseAutocomplete();
    return this.instance;
  }

  public process(args: string[]) {
    const all = PulseState.get_default().plugins.filter(
      ({ command }) => command !== this.command,
    );

    const fzf = new Fzf(all, {
      selector: (p) => `${p.command} ${p.description}`,
    });

    const filtered = fzf
      .find(args.join(" "))
      .map(({ item }) => item)
      .sort((a, b) =>
        String.prototype.localeCompare.call(a.command, b.command),
      );

    return filtered.map((plugin) => <PluginEntry plugin={plugin} />);
  }
}
