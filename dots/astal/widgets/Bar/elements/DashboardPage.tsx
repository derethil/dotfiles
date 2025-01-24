import { Gtk } from "astal/gtk3";
import { ChildProps, getChildrenBinds } from "utils/children";

interface PageProps extends ChildProps {
  name: string;
}

export function DashboardPage(props: PageProps) {
  return (
    <box valign={Gtk.Align.START} halign={Gtk.Align.START} name={props.name}>
      {getChildrenBinds(props)}
    </box>
  );
}
