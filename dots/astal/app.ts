import { App } from "astal/gtk3";
import style from "./styles/main.scss";
import Bar from "./widgets/Bar";
import { watchStyles } from "./lib/style";

function init() {
  watchStyles();
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
