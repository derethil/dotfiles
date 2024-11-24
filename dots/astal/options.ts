import { Astal } from "astal/gtk3";
import { BarModule } from "widgets/Bar";
import { constructOptions, Opt } from "./lib/options";
import { OPTIONS_CACHE } from "./lib/session";

export const options = constructOptions(OPTIONS_CACHE, {
  bar: {
    position: Opt(Astal.WindowAnchor.LEFT),
    modules: {
      end: Opt<BarModule[]>(["DateTime"]),
    },
  },
});

console.log(options.array());
