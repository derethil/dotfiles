import { PanelButton } from "widgets/PanelButton";

interface ToolProps {
  handleClick: () => void;
  icon: string;
  tooltip?: string;
}

export function DockButton(props: ToolProps) {
  return PanelButton({
    className: "dock-button",
    tooltipText: props.tooltip,
    cursor: "pointer",
    child: Widget.Icon({
      icon: props.icon,
      size: options.docks.iconSize.bind().as((v) => v * 0.75),
    }),
    onClicked: () => props.handleClick(),
  });
}
