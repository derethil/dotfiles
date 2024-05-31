import { bash } from "lib/utils";
import { Client } from "types/service/hyprland";

const Hyprland = await Service.import("hyprland");

export const focusClient = ({ address }: Client) => {
  Hyprland.messageAsync(
    `[[BATCH]]/keyword general:no_cursor_warps true; dispatch focuswindow address:${address}; keyword general:no_cursor_warps false`,
  );
};

export const killClient = (client: Client) => bash(`kill -9 ${client.pid}`);
