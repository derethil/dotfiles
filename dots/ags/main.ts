import "lib/session";
import { init } from "./lib/init";
import { Bar } from "./windows/bar/Bar";
import { config, forMonitors } from "./lib/utils";
import { Dashboard } from "./windows/dashboard/Dashboard";

export default config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {},
  windows: [...forMonitors(Bar), Dashboard()],
});
