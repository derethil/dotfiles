import { Fzf } from "fzf";
import { bash } from "utils";
import { PulseCommand, PulsePlugin } from "widgets/Pulse/types";
import { Binary } from "./Binary";

export class Shell implements PulsePlugin {
  private static instance: Shell;

  public readonly command: PulseCommand = ":e";
  public readonly description = "Run Exeutable";
  public readonly default = false;

  private bins = new Set<string>();

  public static get_default() {
    if (!this.instance) this.instance = new Shell();
    return this.instance;
  }

  public constructor() {
    this.updateBins().catch(console.error);
  }

  public process(args: string[]) {
    this.updateBins().catch(console.error);
    const fzf = new Fzf([...this.bins]);
    return fzf.find(args.join(" ")).map(({ item }) => <Binary binary={item} />);
  }

  private async listBins() {
    const r = await bash(
      "fish -c 'for dir in $PATH; l -1 $dir; end | sort | uniq'",
    );
    return new Set(r.split("\n").filter((bin) => !bin.includes("->")));
  }

  private async updateBins() {
    this.bins = await this.listBins();
  }
}
