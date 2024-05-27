import { icons } from "lib/icons";
import { FontIcon } from "widgets/FontIcon";
import { PanelButton } from "widgets/PanelButton";

interface ToolProps {
  command: string | string[];
  icon: string;
  className: string;
}

const ToolButton = ({ className, command, icon }: ToolProps) =>
  PanelButton({
    className: className,
    cursor: "pointer",
    onClicked: () => {
      Utils.execAsync(command);
      App.toggleWindow("dashboard");
    },
    child: FontIcon({
      label: icon,
    }),
  });

export function ToolsBar() {
  return Widget.Box({
    className: "tool-bar",
    hexpand: true,
    children: [
      ToolButton({
        className: "color-picker",
        command: "hyprpicker -a",
        icon: icons.tools.colorPicker,
      }),
      ToolButton({
        className: "screenshot",
        command: "hyprshot -m region --clipboard-only",
        icon: icons.tools.screenshot,
      }),
    ],
  });
}
