import { IconProps } from "types/widgets/icon";
import { CurrentToolStr } from "./CurrentTool";
import { ButtonProps } from "types/widgets/button";

interface ToolProps {
  handlePrimaryClick?: () => void;
  icon: IconProps["icon"];
  tooltip?: ButtonProps["tooltipText"];
  activeOnTool?: string;
}

export function DockButton(props: ToolProps) {
  return Widget.Button({
    className: "dock-button",
    tooltipText: props.tooltip,
    cursor: "pointer",
    child: Widget.Icon({
      icon: props.icon,
      size: options.docks.iconSize.bind().as((v) => v * 0.75),
    }),
    onClicked: () => props.handlePrimaryClick?.(),
    setup: (self) => {
      if (!props.activeOnTool) return;

      self.hook(CurrentToolStr, () => {
        self.toggleClassName(
          "active",
          CurrentToolStr.value === props.activeOnTool,
        );
      });
    },
  });
}
