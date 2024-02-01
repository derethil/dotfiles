import AgsWindow from "resource:///com/github/Aylur/ags/widgets/window.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Widget, { subclass } from "resource:///com/github/Aylur/ags/widget.js";
import options from "../options.js";
import GObject from "gi://GObject";
import { register } from "resource:///com/github/Aylur/ags/widgets/widget.js";

// @ts-ignore
class PopupWindow extends AgsWindow {
  static {
    GObject.registerClass(this);
  }

  /**
   * @param {import('types/widgets/window').WindowProps<any> & {
   *      name: string
   *      child: import('types/widgets/box.js').default
   *      transition?: import('types/widgets/revealer.js').RevealerProps<any>['transition']
   *  }} config
   */
  constructor({ name, child, transition = "none", visible = false, ...rest }) {
    super({
      ...rest,
      name,
      popup: true,
      focusable: true,
      class_names: ["popup-window", name],
    });

    child.toggleClassName("window-content");
    this.revealer = Widget.Revealer({
      transition,
      child,
      transition_duration: options.transition.value,
      setup: (self) =>
        self.hook(App, (_, wname, visible) => {
          if (wname === name) this.revealer.reveal_child = visible;
        }),
    });

    this.child = Widget.Box({
      css: "padding: 1px;",
      child: this.revealer,
    });

    this.show_all();
    this.visible = visible;
  }

  set transition(dir) {
    this.revealer.transition = dir;
  }
  get transition() {
    return this.revealer.transition;
  }
}


/**
 * @param {import('types/widgets/window.js').WindowProps<any> & {
 *      name: string
 *      child: import('types/widgets/box.js').default
 *      transition?: import('types/widgets/revealer.js').RevealerProps<any>['transition']
 *  }} config
 */
export default (config) => new PopupWindow(config);
