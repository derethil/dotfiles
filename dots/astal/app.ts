import { App } from "astal/gtk3";
import { handleMessage, setupMessageHandlers } from "lib/messages";
import { session } from "lib/session";
import { watchStyles } from "lib/style";
import { WLSunset } from "lib/wlsunset";
import { OverlayType } from "state/overlay";
import { Bar } from "widgets/Bar";
import { Corners } from "widgets/Corners";
import { Overlay } from "widgets/Overlay";
import { PopupNotifications } from "widgets/PopupNotifications";
import { Pulse } from "widgets/Pulse";

function initialize() {
  session();
  WLSunset.set_default();
  setupMessageHandlers();
  watchStyles().catch((err: unknown) => {
    console.error(`Error watching styles: ${String(err)}`);
  });
}

function createWidgets() {
  App.get_monitors().map((monitor) => {
    Corners(monitor);
    Bar(monitor);
    PopupNotifications(monitor);
  });
  Pulse();
  Object.values(OverlayType).forEach((type) => {
    Overlay({ type, className: `overlay-${type}` });
  });
}

App.start({
  requestHandler: handleMessage,
  icons: `./assets/icons`,
  main: () => {
    initialize();
    createWidgets();
  },
});
