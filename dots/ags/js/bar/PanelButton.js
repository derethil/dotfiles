import Widget from "resource:///com/github/Aylur/ags/widget.js";
import App from "resource:///com/github/Aylur/ags/app.js";

/**
 * @typedef {Object} PanelButtonProps
 * @property {any} content
 * @property {any=} icon
 * @property {string=} window
 * @property {string=} color
 * @property {import('types/widgets/box').BoxProps=} boxProps
 */

/** @param {string=} color */
function backgroundColorClass(color) {
  if (!color) return "";
  return `panel-button-icon-bg-${color}`;
}

/**
 * @param {import('types/widgets/button').ButtonProps & PanelButtonProps} o
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
}) => {
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
