import { Gtk } from "astal/gtk3";
import { FlowBox, Separator , CircleButton } from "elements";
import { DashboardState } from "../state/dashboardState";

interface PageButtonProps {
  page: string;
  icon: string;
}

function PageButton(props: PageButtonProps) {
  const dashboard = DashboardState.get_default();

  return (
    <CircleButton onClick={() => (dashboard.page = props.page)}>
      <icon icon={props.icon} iconSize={16} />
    </CircleButton>
  );
}

export function PageSelector() {
  return (
    <>
      <FlowBox
        hexpand
        orientation={Gtk.Orientation.HORIZONTAL}
        className="page-selector"
        selectionMode={Gtk.SelectionMode.NONE}
      >
        <PageButton icon="audio-volume-high-symbolic" page="audio" />
        <PageButton icon="lamp-symbolic" page="hue" />
      </FlowBox>
      <Separator />
    </>
  );
}
