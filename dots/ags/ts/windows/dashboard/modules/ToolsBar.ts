import FontIcon from "ts/widgets/FontIcon";
import PanelButton from "ts/widgets/PanelButton";
import icons from "ts/icons";

interface ToolProps {
  command: string | string[];
  icon: string;
  class_name: string;
}

const ToolButton = ({ class_name, command, icon }: ToolProps) =>
  PanelButton({
    class_name,
    cursor: "pointer",
    on_clicked: () => {
      Utils.execAsync(command);
      App.toggleWindow("dashboard");
    },
    child: FontIcon({
      label: icon,
    }),
  });

export default () =>
  Widget.Box({
    class_name: "tool-bar",
    hexpand: true,
    children: [
      ToolButton({
        class_name: "color-picker",
        command: "hyprpicker -a",
        icon: icons.tools.colorPicker,
      }),
      ToolButton({
        class_name: "screenshot",
        command: "hyprshot -m region --clipboard-only",
        icon: icons.tools.screenshot,
      }),
    ],
  });
