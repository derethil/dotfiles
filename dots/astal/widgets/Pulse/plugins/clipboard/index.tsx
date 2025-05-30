import { Fzf } from "fzf";
import { Cliphist } from "lib/cliphist";
import { PluginOptions, PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { HistoryButton } from "./HistoryButton";

const ch = Cliphist.get_default();

export class Clipboard implements PulsePlugin {
  private static instance: Clipboard;

  public readonly command: PulseCommand;
  public readonly description = "Clipboard History";
  public readonly default = false;

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new Clipboard(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }

  public process(args: string[]) {
    if (args.join(" ").length <= 3) {
      return [];
    }

    const fzf = new Fzf(ch.history, {
      selector: (item) => item.content ?? "",
    });

    const filtered = fzf.find(args.join(" "));

    return filtered.map(({ item }) => <HistoryButton item={item} />);
  }
}
