import "lib/session";
import { init } from "./lib/init";
import { forMonitors } from "./lib/utils";
import { Bar } from "./windows/bar/Bar";
import { Dashboard } from "./windows/dashboard/Dashboard";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {
    dashboard: options.transition.value,
  },
  windows: [...forMonitors(Bar), Dashboard()],
});
