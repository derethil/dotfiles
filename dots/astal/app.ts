import { App } from "astal/gtk3";
import { handleMessage } from "lib/messages";
import { session } from "lib/session";
import { watchStyles } from "lib/style";
import { Bar } from "widgets/Bar";
import { Corners } from "widgets/Corners";

function init() {
  session();
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
}

App.start({
  requestHandler: handleMessage,
  icons: `./assets/icons`,
  main: () => {
    init();
    createWidgets();
  },
});
