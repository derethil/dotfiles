import { bash } from "utils";
import { PluginOptions, PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Binary } from "./Binary";

export class Shell implements PulsePlugin {
  private static instance: Shell;

  public readonly command: PulseCommand;
  public readonly description = "Run Executable";
  public readonly default = true;

  private bins = "";

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new Shell(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
    this.updateBins().catch(console.error);
  }

  public async process(query: string[]) {
    this.updateBins().catch(console.error);

    const emptyQuery = query.join("").replaceAll(" ", "").length === 0;
    if (emptyQuery) return this.renderBins(this.bins);

    const [search, ...args] = query;
    const filterToSearch = `echo -e "${this.bins}" | rg -i ${search}`;
    const filtered = await bash(filterToSearch);

    return this.renderBins(filtered, args);
  }

  private renderBins(bins: string, args?: string[]) {
    return bins
      .split("\n")
      .slice(0, 50)
      .map((bin) => <Binary binary={bin} arguments={args} />);
  }

  private async updateBins() {
    const command = "fish -c 'for dir in $PATH; l -1 $dir; end | sort | uniq'";
    const result = await bash(command);
    this.bins = result
      .split("\n")
      .filter((bin) => !bin.includes("->"))
      .join("\n");
  }
}
