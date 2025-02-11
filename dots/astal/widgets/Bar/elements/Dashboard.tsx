import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { options } from "options";
import { DashboardPage } from "./DashboardPage";
import { PageSelector } from "./PageSelector";
import { DashboardState } from "../dashboardState";

export function Dashboard() {
  const dashboard = DashboardState.get_default();

  return (
    <revealer
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={options.theme.transition()}
      revealChild={bind(dashboard, "reveal")}
    >
      <box vertical widthRequest={350} className="dashboard">
        <PageSelector />
        <stack
          visibleChildName={bind(dashboard, "page")}
          transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
          transitionDuration={options.theme.transition()}
        >
          <DashboardPage name="audio">Audio</DashboardPage>
          <DashboardPage name="audio2">Audio 2</DashboardPage>
        </stack>
      </box>
    </revealer>
  );
}
