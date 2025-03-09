import { Gtk } from "astal/gtk3";
import { FlowBox, Separator } from "elements";
import { CircleButton } from "./CircleButton";
import { DashboardState } from "../dashboardState";

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
      </FlowBox>
      <Separator />
    </>
  );
}
