import { forMonitors } from "./utils.js";
import init from "./settings/setup.js";
import Bar from "./bar/Bar.js";

const windows = () => [forMonitors(Bar)];

export default {
  onConfigParsed: init,
  windows: windows().flat(1),
  maxStreamVolume: 1.05,
  cacheNotificationActions: false,
  style: "/tmp/ags/scss/style.css",
};
