import Window from "types/widgets/window";
import { init } from "./settings/setup";
import Bar from "./windows/bar/Bar";
import { forMonitors } from "./lib/utils";

const windows: Window<any, any>[][] = [forMonitors(Bar)];

export default {
  onConfigParsed: init,
  windows: windows.flat(1),
};
