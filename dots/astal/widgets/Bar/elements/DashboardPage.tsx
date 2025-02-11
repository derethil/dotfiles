import { Gtk } from "astal/gtk3";
import { ChildProps, getChildrenBinds } from "utils/children";
import { DashboardState } from "../dashboardState";

interface PageProps extends ChildProps {
  name: string;
}

export function DashboardPage(props: PageProps) {
  const dashboard = DashboardState.get_default();
  if (dashboard.page === "") dashboard.page = props.name;

  return (
    <box valign={Gtk.Align.START} halign={Gtk.Align.START} name={props.name}>
      {getChildrenBinds(props)}
    </box>
  );
}
