import { App } from "astal/gtk3";
import { MessageHandler } from "lib/messages";
import { session } from "./lib/session";
import { watchStyles } from "./lib/style";
import { Bar } from "./widgets/Bar";

function init() {
  session();
  watchStyles();
  import("./options");
}

function createWidgets() {
  App.get_monitors().map(Bar);
}

App.start({
  requestHandler: MessageHandler.handleMessage,
  main: async () => {
    init();
    createWidgets();
  },
});
