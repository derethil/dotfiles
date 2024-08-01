import Gio from "types/@girs/gio-2.0/gio-2.0";

const ARCH_UPDATE_CACHE_PATH = "~/.local/state/arch-update";

class ArchUpdateService extends Service {
  static {
    Service.register(
      this,
      {
        "updates-changed": ["int"],
        "state-changed": ["string"],
      },
      {
        updates: ["int", "r"],
        state: ["string", "r"],
      },
    );
  }

  private pending: number = 0;
  private current_state: string = "";

  get updates(): number {
    return this.pending;
  }

  get state(): string {
    return this.current_state;
  }

  private getCachePath(file: string): string {
    const path = `${ARCH_UPDATE_CACHE_PATH}/${file}`;
    return Utils.exec(`bash -c "echo ${path}"`).trim();
  }

  private syncState(file: string | Gio.File) {
    const state = Utils.readFile(file).trim();
    const cleaned = state.replace(/arch-update?_/g, "");
    this.current_state = cleaned === "" ? "up-to-date" : cleaned;
    this.emit("changed", this);
    this.emit("state-changed", this.current_state);
    this.notify("state");
  }

  private syncUpdates(file: string | Gio.File) {
    const updates = Utils.readFile(file).trim().split("\n");
    this.pending = updates?.length ?? 0;
    this.emit("changed", this);
    this.emit("updates-changed", this.current_state);
    this.notify("updates");
  }

  private watchState() {
    const path = this.getCachePath("current_state");
    this.syncState(path);
    Utils.monitorFile(path, (file) => this.syncState(file));
  }

  private watchUpdates() {
    const path = this.getCachePath("last_updates_check");
    this.syncUpdates(path);
    Utils.monitorFile(path, (file) => this.syncUpdates(file));
  }

  public constructor() {
    super();
    this.watchState();
    this.watchUpdates();
  }
}

export const ArchUpdate = new ArchUpdateService();

declare global {
  const archupdate: ArchUpdateService;
}

Object.assign(globalThis, {
  archupdate: ArchUpdate,
});
