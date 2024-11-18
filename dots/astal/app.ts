import { App } from "astal/gtk3";
import { session } from "./lib/session";
import { watchStyles } from "./lib/style";
import style from "./styles/main.scss";
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
  css: style,
  main: async () => {
    init();
    createWidgets();
  },
});
