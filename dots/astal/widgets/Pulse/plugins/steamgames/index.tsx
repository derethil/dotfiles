import { Fzf } from "fzf";
import { SteamGame, SteamGames } from "lib/steamgames";
import { GameButton } from "./GameButton";
import { PulsePlugin, PulseCommand, PluginOptions } from "../../types";

export class Games implements PulsePlugin {
  private static instance: Games;

  public readonly command: PulseCommand;
  public readonly description = "Play Steam Games";
  public readonly default = false;

  private steam = SteamGames.get_default();

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new Games(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }

  public renderApps(games: SteamGame[]) {
    return games.map((game) => <GameButton game={game} />);
  }

  public process(args: string[]) {
    if (args.length === 0) return this.renderApps(this.steam.games);
    this.steam.reload();
    const fzf = new Fzf(this.steam.games, {
      selector: (game) => game.name,
    });
    const items = fzf.find(args.join(" ")).map(({ item }) => item);
    return this.renderApps(items);
  }

  public searchAdornment(explicit?: boolean) {
    if (!explicit) return null;
    return <icon icon="view-grid-symbolic" className="apps-adornment" />;
  }
}
