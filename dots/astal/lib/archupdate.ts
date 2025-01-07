import { exec, monitorFile, property, readFile, register } from "astal";
import GObject from "gi://GObject?version=2.0";

const ARCH_UPDATE_CACHE_PATH = "~/.local/state/arch-update";

export enum ArchUpdateStatus {
  UP_TO_DATE = "up-to-date",
  UPDATES_AVAILABLE = "updates-available",
}

@register({ GTypeName: "ArchUpdate" })
export class ArchUpdate extends GObject.Object {
  private static instance: ArchUpdate;

  private _available = 0;
  private _status: ArchUpdateStatus = ArchUpdateStatus.UP_TO_DATE;

  @property(Number)
  get available() {
    return this._available;
  }

  @property(String)
  get status() {
    return this._status;
  }

  public static get_default() {
    if (!this.instance) this.instance = new ArchUpdate();
    return this.instance;
  }

  constructor() {
    super();
    this.watchStatus();
    this.watchUpdates();
  }

  private getCachePath(file: string): string {
    const path = `${ARCH_UPDATE_CACHE_PATH}/${file}`;
    return exec(`bash -c 'echo ${path}'`).trim();
  }

  private syncStatus(file: string) {
    const status = readFile(file).trim();
    const containsUpdates = status.includes("updates-available");
    this._status = containsUpdates
      ? ArchUpdateStatus.UPDATES_AVAILABLE
      : ArchUpdateStatus.UP_TO_DATE;
    this.notify("status");
  }

  private syncUpdates(file: string) {
    const contents = readFile(file).split("\n");
    this._available = contents.filter((l) => l).length;
    this.notify("available");
  }

  private watchStatus() {
    const path = this.getCachePath("tray_icon");
    this.syncStatus(path);
    monitorFile(path, (file) => this.syncStatus(file));
  }

  private watchUpdates() {
    const path = this.getCachePath("last_updates_check");
    this.syncUpdates(path);
    monitorFile(path, (file) => this.syncUpdates(file));
  }
}
