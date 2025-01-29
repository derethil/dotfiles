import { Gtk } from "astal/gtk3";
import { plugins } from "./plugins";

export type PulseResult = Gtk.Widget;
export type PulseCommand = `:${string}`;

export interface PulsePlugin {
  readonly command: PulseCommand;
  readonly description: string;
  readonly default: boolean;
  process: (args: string[], explicit?: boolean) => PromiseOption<PulseResult[]>;
  searchAdornment?: (explicit?: boolean) => Gtk.Widget | null;
}

export interface PluginOption {
  plugin: keyof typeof plugins;
  command: PulseCommand;
}

export type PluginOptions = Omit<PluginOption, "plugin">;

export interface StaticPulsePlugin {
  get_default: (options: PluginOptions) => PulsePlugin;
}
