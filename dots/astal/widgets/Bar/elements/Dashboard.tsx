import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { options } from "options";
import { DashboardPage } from "./DashboardPage";
import { DashboardState } from "../dashboardState";

export function Dashboard() {
  const dashboard = DashboardState.get_default();
  dashboard.page = "page1";

  return (
    <Revealer
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={options.theme.transition()}
      revealChild={bind(dashboard, "reveal")}
    >
      <stack
        className="dashboard"
        visibleChildName={bind(dashboard, "page")}
        transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
        transitionDuration={options.theme.transition()}
      >
        <DashboardPage name="page1">hi</DashboardPage>
        <DashboardPage name="page2">hello</DashboardPage>
      </stack>
    </Revealer>
  );
}
