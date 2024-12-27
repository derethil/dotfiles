import { Gtk, Widget } from "astal/gtk3";
import { PulseState } from "./state";

export type PulseResult = Gtk.Widget;

export type PulseCommand = `:${string}`;

export interface PulsePlugin {
  readonly command: PulseCommand;
  readonly description: string;
  readonly default: boolean;
  process: (args: string[], explicit?: boolean) => Promise<PulseResult[]>;
  endAdornment?: (explicit?: boolean) => Gtk.Widget | null;
}

export interface StaticPulsePlugin {
  get_default: (state?: PulseState) => PulsePlugin;
}
