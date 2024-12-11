import { App } from "astal/gtk3";
import { handleMessage, setupMessageHandlers } from "lib/messages";
import { session } from "lib/session";
import { watchStyles } from "lib/style";
import { OverlayType } from "state/overlay";
import { Bar } from "widgets/Bar";
import { Corners } from "widgets/Corners";
import { Overlay } from "widgets/Overlay";

function init() {
  session();
  setupMessageHandlers();
  watchStyles().catch((err: unknown) => {
    console.error(`Error watching styles: ${String(err)}`);
  });
  import("./options").catch((err: unknown) => {
    console.error(`Error importing options: ${String(err)}`);
  });
}

function createWidgets() {
  App.get_monitors().map((monitor) => {
    Corners(monitor);
    Bar(monitor);
  });
  Object.values(OverlayType).forEach((type) => {
    Overlay({ type, className: `overlay-${type}` });
  });
}

App.start({
  requestHandler: handleMessage,
  icons: `./assets/icons`,
  main: () => {
    init();
    createWidgets();
  },
});
