import { Gtk } from "astal/gtk3";

export type PulseResult = Gtk.Widget;

export type PulseCommand = `:${string}`;

export interface PulsePlugin {
  command: PulseCommand;
  description: string;
  process: (args: string[], explicit?: boolean) => PulseResult[];
  default: boolean;
}

export interface StaticPulsePlugin {
  get_default: () => PulsePlugin;
}
