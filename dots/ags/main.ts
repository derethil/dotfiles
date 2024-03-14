import "lib/session";
import { init } from "./lib/init";
import { forMonitors } from "./lib/utils";
import { Bar } from "./windows/bar/Bar";
import { Dashboard } from "./windows/dashboard/Dashboard";
import { Overview } from "windows/overview/Overview";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {
    dashboard: options.transition.value,
    overview: options.transition.value,
  },
  windows: [...forMonitors(Bar), Dashboard(), Overview()],
});
