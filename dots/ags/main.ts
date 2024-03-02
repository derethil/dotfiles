import "lib/session";
import { init } from "./lib/init";
import { forMonitors } from "./lib/utils";
import { Bar } from "./windows/bar/Bar";
import { Dashboard } from "./windows/dashboard/Dashboard";
import { IconBrowser } from "windows/iconBrowser/IconBrowser";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {},
  windows: [...forMonitors(Bar), Dashboard()],
});
