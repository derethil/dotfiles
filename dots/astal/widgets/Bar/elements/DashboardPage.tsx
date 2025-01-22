import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Revealer } from "elements/Revealer";
import { options } from "options";
import { ChildProps, getChildrenBinds } from "utils/children";
import { DashboardState } from "../dashboardState";

interface Props extends ChildProps {
  name: string;
}

export function DashboardPage(props: Props) {
  const dashboard = DashboardState.get_default();

  return (
    <Revealer
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      transitionDuration={options.theme.transition()}
      revealChild={bind(dashboard, "page").as((page) => page === props.name)}
    >
      <box valign={Gtk.Align.START} halign={Gtk.Align.START}>
        {getChildrenBinds(props)}
      </box>
    </Revealer>
  );
}
