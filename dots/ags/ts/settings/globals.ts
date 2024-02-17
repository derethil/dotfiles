import { MprisPlayer } from "resource:///com/github/Aylur/ags/service/mpris.js";
import Brightness from "ts/services/brightness";
import Options from "ts/options";

const Mpris = await Service.import("mpris");
const Audio = await Service.import("audio");

declare global {
  var audio: typeof Audio;
  var app: typeof App;
  var brightness: typeof Brightness;
  var mpris: MprisPlayer;
  var options: typeof Options;
}

export async function globals() {
  try {
    // Options
    // Service Globals
    globalThis.audio = (
      await import("resource:///com/github/Aylur/ags/service/audio.js")
    ).default;
    globalThis.app = (
      await import("resource:///com/github/Aylur/ags/app.js")
    ).default;
    globalThis.brightness = (await import("ts/services/brightness")).default;
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
