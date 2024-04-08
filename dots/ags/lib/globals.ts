import Audio from "types/service/audio";

declare global {
  const audio: typeof Audio;
}

export async function globalServices() {
  const audio = await Service.import("audio");

  Object.assign(globalThis, {
    audio,
  });
}
