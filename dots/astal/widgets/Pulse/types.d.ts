import { Gtk } from "astal/gtk3";

export interface PulseResult extends Gtk.Widget {
  handleActivate: () => void;
}

export type PulseCommand = `:${string}`;

export interface PulsePlugin {
  command: PulseCommand;
  description: string;
  process: (query: string) => PulseResult[];
}

export interface StaticPulsePlugin {
  get_default: () => PulsePlugin;
}
