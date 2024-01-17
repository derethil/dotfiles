import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js";

export async function globals() {
  try {
    // Custom Globals
    globalThis.options = (await import("../options.js")).default;

    // Service Globals
    globalThis.audio = (
      await import("resource:///com/github/Aylur/ags/service/audio.js")
    ).default;
    globalThis.app = (
      await import("resource:///com/github/Aylur/ags/app.js")
    ).default;
    globalThis.audio = (
      await import("resource:///com/github/Aylur/ags/service/audio.js")
    ).default;

    // Sync Mpris

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
