import AgsWindow from "resource:///com/github/Aylur/ags/widgets/window.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Widget, { subclass } from "resource:///com/github/Aylur/ags/widget.js";
import options from "ts/options";
import GObject from "gi://GObject";
import Revealer, { RevealerProps } from "types/widgets/revealer";
import Box from "types/widgets/box";
import { WindowProps } from "types/widgets/window";

const keyGrabber = Widget.Window({
  name: "key-grabber",
  popup: true,
  anchor: ["top", "left", "right", "bottom"],
  css: "background-color: transparent;",
  visible: false,
  exclusivity: "ignore",
  keymode: "on-demand",
  layer: "top",
  attribute: { list: [] as string[] },
  setup: (self) =>
    self.on("notify::visible", ({ visible }) => {
      if (!visible)
        self.attribute?.list.forEach((name) => App.closeWindow(name));
    }),
  child: Widget.EventBox({ vexpand: true }).on("button-press-event", () => {
    App.closeWindow("key-grabber");
    keyGrabber.attribute?.list.forEach((name) => App.closeWindow(name));
  }),
});

// add before any PopupWindow is instantiated
App.addWindow(keyGrabber);

export interface PopupWindowProps extends WindowProps<Box<any, any>, any> {
  name: string;
  child: Box<any, any>;
  transition?: RevealerProps<any>["transition"];
}

export class PopupWindow extends AgsWindow<any, any> {
  revealer: Revealer<any, any>;
  static {
    GObject.registerClass(this);
  }

  constructor({
    name,
    child,
    transition = "none",
    visible = false,
    ...rest
  }: PopupWindowProps) {
    super({
      ...rest,
      name,
      popup: true,
      keymode: "exclusive",
      layer: "overlay",
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
    // @ts-expect-error
    this.visible = visible;

    // @ts-expect-error
    keyGrabber.bind("visible", this, "visible");
    keyGrabber.attribute?.list.push(name);
  }

  set transition(dir) {
    this.revealer.transition = dir;
  }
  get transition() {
    return this.revealer.transition;
  }
}

export default subclass<typeof PopupWindow, PopupWindowProps>(PopupWindow);
