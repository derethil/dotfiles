import { Fzf } from "fzf";
import { Group, Hue, Light } from "lib/hue";
import { GroupButton } from "./GroupButton";
import { LightButton } from "./LightButton";
import { PulsePlugin, PulseCommand, PluginOptions } from "../../types";

const hue = Hue.get_default();

export class HueControl implements PulsePlugin {
  private static instance: HueControl;

  public readonly command: PulseCommand;
  public readonly description = "Philips Hue";
  public readonly default = false;

  public static get_default(options: PluginOptions) {
    if (!this.instance) this.instance = new HueControl(options);
    return this.instance;
  }

  public constructor(options: PluginOptions) {
    this.command = options.command;
  }
  public process(args: string[]) {
    const items = [...hue.lights, ...hue.groups];

    const fzf = new Fzf(items, {
      selector: (item: Group | Light) => `${item.name} Light`,
      sort: false,
    });

    return fzf
      .find(args.join(" "))
      .sort((a, b) => {
        if (a.item instanceof Light && b.item instanceof Group) return 1;
        if (a.item instanceof Group && b.item instanceof Light) return -1;
        if (a.item.name > b.item.name) return 1;
        if (a.item.name < b.item.name) return -1;
        return 0;
      })
      .map(({ item }) => {
        if (item instanceof Light) return <LightButton light={item} />;
        return <GroupButton group={item} />;
      });
  }
}
