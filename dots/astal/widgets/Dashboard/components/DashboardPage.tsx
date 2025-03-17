import { Gtk } from "astal/gtk3";
import { ChildProps, getChildrenBinds } from "utils/children";
import { DashboardState } from "..";

interface PageProps extends ChildProps {
  name: string;
}

export function DashboardPage(props: PageProps) {
  const dashboard = DashboardState.get_default();
  if (dashboard.page === "") dashboard.page = dashboard.defaultPage = props.name;

  return (
    <box valign={Gtk.Align.START} halign={Gtk.Align.FILL} name={props.name} vertical>
      {getChildrenBinds(props)}
    </box>
  );
}
