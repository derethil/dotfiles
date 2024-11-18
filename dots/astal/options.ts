import { constructOptions, Opt } from "./lib/options";
import { OPTIONS_CACHE } from "./lib/session";

const optionsConfig = constructOptions(OPTIONS_CACHE, {
  blur: Opt(true),
});

declare global {
  const options: typeof optionsConfig;
}

Object.assign(globalThis, { options: optionsConfig });
