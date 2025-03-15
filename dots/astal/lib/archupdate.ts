import { Gio, GLib, monitorFile, property, register } from "astal";
import GObject from "gi://GObject?version=2.0";
import { readFileIfExists } from "utils";

const STATE_DIR = `${GLib.get_user_state_dir()}/arch-update`;

export enum ArchUpdateStatus {
  UP_TO_DATE,
  UPDATES_AVAILABLE,
}

interface Update {
  package: string;
  currentVersion: string;
  newVersion: string;
}

@register({ GTypeName: "ArchUpdate" })
export class ArchUpdate extends GObject.Object {
  private static instance: ArchUpdate;

  private _updates: Update[] = [];

  @property(Number)
  get available() {
    return this._updates.length;
  }

  @property(String)
  get status() {
    if (this.available > 0) return ArchUpdateStatus.UPDATES_AVAILABLE;
    return ArchUpdateStatus.UP_TO_DATE;
  }

  public static get_default() {
    if (!this.instance) this.instance = new ArchUpdate();
    return this.instance;
  }

  constructor() {
    super();
    this.watchUpdates();
  }

  private syncUpdates(file: string) {
    const contents = readFileIfExists(file)?.trim().split("\n");
    const updates = contents?.map((line) => this.parsePackage(line));
    if (!contents) return;

    this._updates = (updates?.filter((l) => l) as Update[]) ?? [];
    this.notify("available");
  }

  private parsePackage(line: string): Update | null {
    const cleaned = line.replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      "",
    );

    const match = /^(\S+)\s+([0-9.-]+)\s+->\s+([0-9.-]+)$/.exec(cleaned);
    if (!match) return null;

    const [_, packageName, currentVersion, newVersion] = match;
    return { package: packageName, currentVersion, newVersion };
  }

  private watchUpdates() {
    this.syncUpdates(`${STATE_DIR}/last_updates_check`);

    monitorFile(STATE_DIR, (file, event) => {
      const isChecking = file.endsWith("last_updates_check");
      const isChanging = event === Gio.FileMonitorEvent.CHANGED;

      if (isChecking && isChanging) this.syncUpdates(file);
    });
  }
}
