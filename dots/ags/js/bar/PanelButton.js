import Widget from "resource:///com/github/Aylur/ags/widget.js";
import App from "resource:///com/github/Aylur/ags/app.js";

/**
 * @typedef {Object} PanelButtonProps
 * @property {any} content
 * @property {string=} window
 * @property {import('types/widgets/box').BoxProps=} boxProps
 */

/**
 * @param {import('types/widgets/button').ButtonProps & PanelButtonProps} o
 */
export default ({
  class_name,
  class_names,
  boxProps,
  content,
  window = "",
  setup,
  ...rest
}) => {
  return Widget.Button({
    class_name: `panel-button ${class_name}`,
    child: Widget.Box({
      hpack: "center",
      vpack: "center",
      children: Array.isArray(content) ? content : [content],
      ...boxProps,
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