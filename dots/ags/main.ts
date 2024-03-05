import "lib/session";
import { init } from "./lib/init";
import { Bar } from "./windows/bar/Bar";
import { forMonitors } from "./lib/utils";
import { Dashboard } from "./windows/dashboard/Dashboard";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {},
  windows: [...forMonitors(Bar), Dashboard()],
});
