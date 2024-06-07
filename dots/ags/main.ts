import "lib/session";
import "style/style";
import { ApplicationDock } from "windows/applicationdock/ApplicationDock";
import { Bar } from "windows/bar/Bar";
import { Calendar } from "windows/calendar/Calendar";
import { Dashboard } from "windows/dashboard/Dashboard";
import { EyeNudge } from "windows/eyenudge/EyeNudge";
import { NotificationPopup } from "windows/notifications/NotificationPopups";
import { OnScreenDisplay } from "windows/osd/OnScreenDisplay";
import { Settings } from "windows/settings/Settings";
import { SystemDock } from "windows/systemdock/SystemDock";
import { init } from "./lib/init";
import { forMonitors } from "./lib/utils";

App.config({
  onConfigParsed: () => {
    init();
  },
  closeWindowDelay: {
    dashboard: options.transition.value,
    eyenudge: options.transition.value,
    calendar: options.transition.value,
  },
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(OnScreenDisplay),
    ...forMonitors(ApplicationDock),
    ...forMonitors(SystemDock),
    ...forMonitors(NotificationPopup),
    Calendar(),
    EyeNudge(),
    Dashboard(),
    Settings(),
  ],
});
