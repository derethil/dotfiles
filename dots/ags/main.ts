import "lib/session";
import "style/style";
import { init } from "./lib/init";
import { forMonitors } from "./lib/utils";
import { Bar } from "./windows/bar/Bar";
import { Dashboard } from "./windows/dashboard/Dashboard";
import { OnScreenDisplay } from "./windows/osd/OnScreenDisplay";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {
    dashboard: options.transition.value,
  },
  windows: [...forMonitors(Bar), ...forMonitors(OnScreenDisplay), Dashboard()],
});
