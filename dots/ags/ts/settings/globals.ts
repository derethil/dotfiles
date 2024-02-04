import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js";
import { MprisPlayer } from "resource:///com/github/Aylur/ags/service/mpris.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Options from "../options";

declare global {
  var audio: typeof Audio;
  var app: typeof App;
  var mpris: MprisPlayer;
  var options: typeof Options;
}

export async function globals() {
  try {
    // Options
    globalThis.options = (await import("../options")).default;
    // Service Globals
    globalThis.audio = (
      await import("resource:///com/github/Aylur/ags/service/audio.js")
    ).default;
    globalThis.app = (
      await import("resource:///com/github/Aylur/ags/app.js")
    ).default;

    // Sync Services
    Mpris.players.forEach((player) => {
      player.connect("changed", (player) => {
        globalThis.mpris = player || Mpris.players[0];
      });
    });

    Mpris.connect("player-added", (mpris, bus) => {
      mpris.getPlayer(bus)?.connect("changed", (player) => {
        globalThis.mpris = player || Mpris.players[0];
      });
    });

    Mpris.connect("player-closed", () => {
      globalThis.mpris = Mpris.players[0];
    });
  } catch (error) {
    logError(error);
  }
}
