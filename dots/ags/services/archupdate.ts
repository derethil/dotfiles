import Gio from "types/@girs/gio-2.0/gio-2.0";

const ARCH_UPDATE_CACHE_PATH = "~/.local/state/arch-update";

export enum ArchUpdateStatus {
  UP_TO_DATE = "up-to-date",
  UPDATES_AVAILABLE = "updates-available",
}

class ArchUpdateService extends Service {
  static {
    Service.register(
      this,
      {
        "updates-changed": ["int"],
        "status-changed": ["string"],
      },
      {
        updates: ["int", "r"],
        status: ["string", "r"],
      },
    );
  }

  private pending: number = 0;
  #status: ArchUpdateStatus = ArchUpdateStatus.UP_TO_DATE;

  get updates(): number {
    return this.pending;
  }

  get status(): string {
    return this.#status;
  }

  private getCachePath(file: string): string {
    const path = `${ARCH_UPDATE_CACHE_PATH}/${file}`;
    return Utils.exec(`bash -c "echo ${path}"`).trim();
  }

  private syncStatus(file: string | Gio.File) {
    const status = Utils.readFile(file).trim();
    const containsUpdates = status.includes("updates-available");
    this.#status = containsUpdates
      ? ArchUpdateStatus.UPDATES_AVAILABLE
      : ArchUpdateStatus.UP_TO_DATE;
    this.emit("changed");
    this.emit("status-changed", this.#status);
    this.notify("status");
  }

  private syncUpdates(file: string | Gio.File) {
    const updates = Utils.readFile(file).trim().split("\n");
    this.pending = updates?.length ?? 0;
    this.emit("changed");
    this.emit("updates-changed", this.pending);
    this.notify("updates");
  }

  private watchStatus() {
    const path = this.getCachePath("tray_icon");
    this.syncStatus(path);
    Utils.monitorFile(path, (file) => this.syncStatus(file));
  }

  private watchUpdates() {
    const path = this.getCachePath("last_updates_check");
    this.syncUpdates(path);
    Utils.monitorFile(path, (file) => this.syncUpdates(file));
  }

  public constructor() {
    super();
    this.watchStatus();
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
