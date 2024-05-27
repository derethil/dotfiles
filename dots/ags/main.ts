import "lib/session";
import "style/style";
import { init } from "./lib/init";
import { forMonitors } from "./lib/utils";
import { Bar } from "./windows/bar/Bar";
import { Dashboard } from "./windows/dashboard/Dashboard";
import { OnScreenDisplay } from "./windows/osd/OnScreenDisplay";
import { Settings } from "windows/settings/Settings";
import { EyeNudge } from "windows/eyenudge/EyeNudge";
import { FloatingDock } from "windows/dock/FloatingDock";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {
    dashboard: options.transition.value,
    eyenudge: options.transition.value,
  },
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(OnScreenDisplay),
    ...forMonitors(FloatingDock),
    EyeNudge(),
    Dashboard(),
    Settings(),
  ],
});
