import { PulseState } from "widgets/Pulse/state";
import { PulseCommand, PulsePlugin } from "../../types";
import { Fzf } from "fzf";
import { PluginEntry } from "./PluginEntry";

export class PluginAutocomplete implements PulsePlugin {
  private static instance: PluginAutocomplete;

  public readonly command: PulseCommand = ":";
  public readonly description = "View Commands";
  public readonly default = false;

  public static get_default() {
    if (!this.instance) this.instance = new PluginAutocomplete();
    return this.instance;
  }

  public async process(args: string[]) {
    const all = PulseState.get_default().plugins.filter(({ command }) => command !== this.command);
    const fzf = new Fzf(all, { selector: (plugin) => `${plugin.command} ${plugin.description}` });
    const filtered = fzf.find(args.join(" ")).map(({ item }) => item);
    return filtered.map((plugin) => <PluginEntry plugin={plugin} />);
  }
}
