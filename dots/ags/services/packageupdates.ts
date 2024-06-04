import { bash, dependencies } from "lib/utils";

type PackageType = "pacman" | "aur";

const CHECK_UPDATE_COMMAND: Record<PackageType, string> = {
  pacman: "checkupdates",
  aur: "yay -Qum --devel 2> /dev/null",
};

class PackageUpdatesService extends Service {
  static {
    Service.register(
      this,
      {
        "updates-changed": ["int"],
      },
      {
        "pacman-updates": ["int", "r"],
        "aur-updates": ["int", "r"],
      },
    );
  }

  private intervalMs: number = 300000;

  private pacman: number = 0;
  private aur: number = 0;

  get pacman_updates(): number {
    return this.pacman;
  }

  get aur_updates(): number {
    return this.aur;
  }

  private async checkUpdates(packageType: PackageType) {
    try {
      const out = await bash(CHECK_UPDATE_COMMAND[packageType]);
      if (out === "") return 0;
      return out.trim().split("\n").length;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  private async checkSystemUpdates() {
    const updates = await Promise.all([
      this.checkUpdates("pacman"),
      this.checkUpdates("aur"),
    ]);

    [this.pacman, this.aur] = updates;

    this.emit("updates-changed", updates.reduce((acc, val) => acc + val, 0));
  }

  public constructor() {
    super();
    if (!dependencies("yay", "checkupdates")) return;
    this.checkSystemUpdates();
    setInterval(this.checkSystemUpdates, this.intervalMs);
  }

  connect(
    event = "updates-changed",
    callback: (_: this, ...args: any[]) => void,
  ) {
    return super.connect(event, callback);
  }

  public refresh() {
    this.checkSystemUpdates();
  }
}

export const PackageUpdates = new PackageUpdatesService();

declare global {
  const packageupdates: PackageUpdatesService;
}

Object.assign(globalThis, {
  packageupdates: PackageUpdates,
});
