import { Variable } from "resource:///com/github/Aylur/ags/variable.js";
import PanelButton from "ts/widgets/PanelButton";

type PanelButtonProps = Parameters<typeof PanelButton>[0];

interface IconModuleProps extends PanelButtonProps {
  icon: PanelButtonProps["child"];
  labelColor?: string | Variable<string>;
}

export default (props: IconModuleProps) => {
  const { icon, labelColor, ...rest } = props;
  return PanelButton({
    ...rest,
    setup: (self) => {
      self.toggleClassName("panel-button-icon");

      if (typeof labelColor === "string")
        self.toggleClassName(`panel-button-icon-bg-${labelColor}`);

      if (labelColor instanceof Variable) {
        self.hook(labelColor, () => {
          self.class_names = self.class_names.filter(
            (c) => !c.startsWith("panel-button-icon-bg-")
          );
          self.toggleClassName(`panel-button-icon-bg-${labelColor.value}`);
        });
      }
    },
    child: Widget.Box({
      hexpand: true,
      vertical: true,
      children: [
        Widget.Box({
          vertical: true,
          child: icon,
        }),
        Widget.Box({
          vertical: true,
          child: props.child,
        }),
      ],
    }),
  });
};