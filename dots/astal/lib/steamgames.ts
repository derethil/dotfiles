import { execAsync, GObject, property, register, signal } from "astal";
import { options } from "options";
import { bash } from "utils";

async function readGames(appsPath: string) {
  return await bash([
    `fd ".acf" ${appsPath} --maxdepth 1 --type f  --exec awk -F '"' '/"appid|name/{ printf $4 " " } END { print "" }' {}`,
  ]).catch(console.error);
}

@register({ GTypeName: "SteamGames" })
export class SteamGames extends GObject.Object {
  private static instance: SteamGames;

  private appsPath = options.libs.steam.appsPath();
  private _games: SteamGame[] = [];

  public static get_default() {
    if (!this.instance) this.instance = new SteamGames();
    return this.instance;
  }

  @property(Object)
  public get games() {
    return this._games;
  }

  constructor() {
    super();
    this.syncGames().catch(console.error);
    this.appsPath.subscribe(() => {
      this.syncGames().catch(console.error);
    });
  }

  private async syncGames() {
    try {
      const result = await readGames(this.appsPath.get());
      if (!result) return;
      const raw = result.split("\n").map((line) => {
        const appid = line.substring(0, line.indexOf(" "));
        const name = line.substring(line.indexOf(" ") + 1);
        return [appid, name];
      });
      this._games = raw.map(([appid, name]) => new SteamGame(Number(appid), name));
      this.notify("games");
    } catch (e) {
      console.error(e);
    }
  }

  @signal()
  public reload() {
    this.syncGames().catch(console.error);
  }
}

export class SteamGame {
  public readonly name: string;
  public readonly appid: number;

  public constructor(appid: number, name: string) {
    this.appid = appid;
    this.name = name;
  }

  public launch() {
    execAsync(`steam steam://rungameid/${this.appid}`).catch(console.error);
  }
}
