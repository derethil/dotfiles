import { bind, idle } from "astal";
import { Gtk } from "astal/gtk3";
import { options } from "options";
import { PageSelector } from "./PageSelector";
import { DashboardState } from "..";
import { AudioPage } from "../pages/Audio";
import { HuePage } from "../pages/Hue";

export function Dashboard() {
  const dashboard = DashboardState.get_default();

  return (
    <revealer
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={options.theme.transition()}
      setup={(self) => {
        dashboard.connect("notify::reveal", () => {
          idle(() => (self.revealChild = dashboard.reveal));
        });
      }}
    >
      <box vertical widthRequest={350} className="dashboard">
        <PageSelector />
        <stack
          widthRequest={350}
          visibleChildName={bind(dashboard, "page")}
          transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
          transitionDuration={options.theme.transition()}
        >
          <AudioPage />
          <HuePage />
        </stack>
      </box>
    </revealer>
  );
}
