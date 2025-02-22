import { App } from "astal/gtk3";
import { loadEnv } from "lib/env";
import { handleMessage, loadMessageHandlers } from "lib/messages";
import { loadSessionFiles } from "lib/session";
import { styles } from "lib/style";
import { WLSunset } from "lib/wlsunset";
import { widgets } from "widgets";

async function session() {
  await loadSessionFiles();
  loadMessageHandlers();
  loadEnv();
  WLSunset.load();
  styles().catch(console.error);
}

App.start({
  requestHandler: handleMessage,
  main: () => {
    session().then(widgets).catch(console.error);
  },
});
