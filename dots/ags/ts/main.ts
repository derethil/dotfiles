import Window from "types/widgets/window";
import { init } from "./settings/setup";
import Bar from "./windows/bar/Bar";
import { forMonitors } from "./lib/utils";
import Dashboard from "./windows/dashboard/Dashboard";

type Windows = Window<any, any> | Window<any, any>[];
const windows: Windows[] = [forMonitors(Bar), Dashboard()];

export default {
  onConfigParsed: init,
  windows: windows.flat(1),
};
