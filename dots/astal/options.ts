import { Astal } from "astal/gtk3";
import { BarModule } from "widgets/Bar";
import { constructOptions, Opt } from "./lib/options";
import { OPTIONS_CACHE } from "./lib/session";

export const options = constructOptions(OPTIONS_CACHE, {
  // General Options
  theme: {
    color: {
      accent: {
        1: { muted: Opt("#C14A4A"), default: Opt("#EA6962") },
        2: { muted: Opt("#C76E2D"), default: Opt("#E78A4E") },
        3: { muted: Opt("#BA832C"), default: Opt("#D8A657") },
        4: { muted: Opt("#7E8E50"), default: Opt("#A9B665") },
        5: { muted: Opt("#5f7e5b"), default: Opt("#89B482") },
        6: { muted: Opt("#5C7E81"), default: Opt("#7DAEA3") },
        7: { muted: Opt("#945e77"), default: Opt("#D3869B") },
      },
      status: {
        error: { muted: Opt("#C14A4A"), default: Opt("#EA6962") },
        warning: { muted: Opt("#B07C3D"), default: Opt("#D8A657") },
        critical: { muted: Opt("#C76E2D"), default: Opt("#E78A4E") },
        success: { muted: Opt("#7E8E50"), default: Opt("#A9B665") },
      },
      background: {
        dim: Opt("#141617"),
        muted: Opt("#1D2021"),
        default: Opt("#282828"),
        surface: Opt("#3C3836"),
        highlight: Opt("#504945"),
      },
      text: {
        muted: Opt("#928374"),
        default: Opt("#D4BE98"),
        highlight: Opt("#DDC7A1"),
      },
      border: {
        default: Opt("#3C3836"),
        highlight: Opt("#504945"),
      },
    },
  },
  // Widget Options
  bar: {
    position: Opt(Astal.WindowAnchor.LEFT),
    modules: {
      end: Opt<BarModule[]>(["DateTime"]),
    },
  },
});
