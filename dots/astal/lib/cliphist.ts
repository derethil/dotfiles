import { exec, GObject, property, register } from "astal";
import { bash } from "utils";

export type History = CliphistItem[];

@register({ GTypeName: "Cliphist" })
export class Cliphist extends GObject.Object {
  static instance: Cliphist;

  static get_default() {
    if (!this.instance) this.instance = new Cliphist();
    return this.instance;
  }

  @property(Object)
  get history() {
    return this.getHistory();
  }

  private getHistory(): History {
    const lines = exec("cliphist list")
      .split("\n")
      .filter((line) => line.trim() !== "");

    return lines.map((line) => {
      const entries = line.split("\t", 2).filter(([key, value]) => key && value);
      return new CliphistItem(entries as [string, string]);
    });
  }
}

export class CliphistItem {
  public readonly item: [string, string];

  constructor(item: [string, string]) {
    this.item = item;
  }

  get id() {
    return this.item[0];
  }

  get content() {
    return this.item[1];
  }

  public copy() {
    bash(`cliphist decode ${this.id} | wl-copy`).catch(console.error);
  }
}
