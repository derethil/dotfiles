import Widget from "resource:///com/github/Aylur/ags/widget.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import { BoxProps } from "types/widgets/box";
import { ButtonProps } from "types/widgets/button";

function backgroundColorClass(color?: string) {
  if (!color) return "";
  return `panel-button-icon-bg-${color}`;
}

interface PanelButtonProps extends ButtonProps<any> {
  content: any;
  icon?: any;
  window?: string;
  color?: string;
  boxProps?: BoxProps<any>;
}

/**
 * @param {s} o
 */
export default ({
  class_name,
  class_names,
  boxProps,
  content,
  icon,
  color,
  window = "",
  setup,
  ...rest
}: PanelButtonProps) => {
  const icon_class = icon
    ? `panel-button-icon ${backgroundColorClass(color)}`
    : "";

  return Widget.Button({
    class_name: `panel-button ${icon_class} ${class_name}`,
    child: Widget.Box({
      vertical: true,
      ...boxProps,
      children: [
        ...(icon
          ? [
              Widget.Box({
                vertical: true,
                child: icon,
              }),
            ]
          : []),
        Widget.Box({
          vertical: true,
          children: Array.isArray(content) ? content : [content],
        }),
      ],
    }),
    setup: (self) => {
      // Handle opening and closing windows
      let open = false;

      self.hook(App, (_, win, visible) => {
        if (win !== window) return;

        if (open && !visible) {
          open = false;
          self.toggleClassName("active", false);
        }

        if (visible) {
          open = true;
          self.toggleClassName("active");
        }
      });

      if (setup) setup(self);
    },
    ...rest,
  });
};
