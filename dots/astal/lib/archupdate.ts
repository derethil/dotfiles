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
    const lines = readFileIfExists(file)?.split("\n").filter(Boolean);
    if (!lines) return;

    const updates = lines?.map((line) => this.parsePackage(line));
    this._updates = (updates?.filter((l) => l) as Update[]) ?? [];
    this.notify("available");
  }

  private parsePackage(line: string): Update | null {
    const cleaned = line.replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      "",
    );

    if (cleaned === "") return null;

    const [packageName, currentVersion, , newVersion] = cleaned.split(/\s+->\s+|\s+/);
    return { package: packageName, currentVersion, newVersion };
  }

  private watchUpdates() {
    this.syncUpdates(`${STATE_DIR}/last_updates_check`);

    monitorFile(STATE_DIR, (file, event) => {
      const isUpdatesFile = file.endsWith("_updates_check");
      const doneModifying = event === Gio.FileMonitorEvent.CHANGED;

      if (isUpdatesFile && doneModifying) {
        this.syncUpdates(file);
      }
    });
  }
}
