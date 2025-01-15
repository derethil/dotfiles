import { bash } from "utils";
import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Binary } from "./Binary";

export class Shell implements PulsePlugin {
  private static instance: Shell;

  public readonly command: PulseCommand = ":e";
  public readonly description = "Run Exeutable";
  public readonly default = true;

  private bins = "";

  public static get_default() {
    if (!this.instance) this.instance = new Shell();
    return this.instance;
  }

  public constructor() {
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
      .slice(0, 100)
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
