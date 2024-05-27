import type Gtk from "gi://Gtk?version=3.0";
import { type EventBoxProps } from "types/widgets/eventbox";
import { type RevealerProps } from "types/widgets/revealer";
import { type WindowProps } from "types/widgets/window";

type Transition = RevealerProps["transition"];
type Child = WindowProps["child"];

type PopupWindowProps = Omit<WindowProps, "name"> & {
  name: string;
  layout?: keyof ReturnType<typeof Layout>;
  transition?: Transition;
  locked?: boolean;
};

interface PaddingProps {
  name: string;
  locked?: boolean;
  css?: EventBoxProps["css"];
  hexpand?: EventBoxProps["hexpand"];
  vexpand?: EventBoxProps["vexpand"];
}

export const Padding = (props: PaddingProps) =>
  Widget.EventBox({
    hexpand: props.hexpand ?? true,
    vexpand: props.vexpand ?? true,
    can_focus: false,
    child: Widget.Box({ css: props.css ?? "" }),
    setup: (w) => {
      if (props.locked) return;
      w.on("button-press-event", () => App.toggleWindow(props.name));
    },
  });

interface PopupRevealerProps {
  name: string;
  child: Child;
  transition?: Transition;
}

const PopupRevealer = (props: PopupRevealerProps) =>
  Widget.Box(
    { css: "padding: 1px;" },
    Widget.Revealer({
      transition: props.transition ?? "slide_down",
      child: Widget.Box({
        class_name: "window-content",
        child: props.child,
      }),
      transitionDuration: options.transition.bind(),
      setup: (self) =>
        self.hook(App, (_, wname, visible) => {
          if (wname === props.name) self.reveal_child = visible;
        }),
    }),
  );

interface LayoutProps {
  name: string;
  child: Child;
  locked?: boolean;
  transition?: Transition;
}

const Layout = (props: LayoutProps) => ({
  center: () =>
    Widget.CenterBox(
      {},
      Padding(props),
      Widget.CenterBox(
        { vertical: true },
        Padding(props),
        PopupRevealer(props),
        Padding(props),
      ),
      Padding(props),
    ),
  top: () =>
    Widget.CenterBox(
      {},
      Padding(props),
      Widget.Box(
        { vertical: true },
        PopupRevealer(props),
        Padding(props),
      ),
      Padding(props),
    ),
  "top-right": () =>
    Widget.Box(
      {},
      Padding(props),
      Widget.Box(
        {
          hexpand: false,
          vertical: true,
        },
        PopupRevealer(props),
        Padding(props),
      ),
    ),
  "top-center": () =>
    Widget.Box(
      {},
      Padding(props),
      Widget.Box(
        {
          hexpand: false,
          vertical: true,
        },
        PopupRevealer(props),
        Padding(props),
      ),
      Padding(props),
    ),
  "top-left": () =>
    Widget.Box(
      {},
      Widget.Box(
        {
          hexpand: false,
          vertical: true,
        },
        PopupRevealer(props),
        Padding(props),
      ),
      Padding(props),
    ),
  "bottom-left": () =>
    Widget.Box(
      {},
      Widget.Box(
        {
          hexpand: false,
          vertical: true,
        },
        Padding(props),
        PopupRevealer(props),
      ),
      Padding(props),
    ),
  "bottom-center": () =>
    Widget.Box(
      {},
      Padding(props),
      Widget.Box(
        {
          hexpand: false,
          vertical: true,
        },
        Padding(props),
        PopupRevealer(props),
      ),
      Padding(props),
    ),
  "bottom-right": () =>
    Widget.Box(
      {},
      Padding(props),
      Widget.Box(
        {
          hexpand: false,
          vertical: true,
        },
        Padding(props),
        PopupRevealer(props),
      ),
    ),
});

export function PopupWindow({
  name,
  child,
  layout = "center",
  transition,
  exclusivity = "ignore",
  locked,
  ...props
}: PopupWindowProps) {
  return Widget.Window<Gtk.Widget>({
    name,
    class_names: [name, "popup-window"],
    setup: (w) => !locked && w.keybind("Escape", () => App.closeWindow(name)),
    visible: false,
    keymode: "on-demand",
    exclusivity,
    layer: "top",
    anchor: ["top", "bottom", "right", "left"],
    child: Layout({ name, child, transition, locked })[layout](),
    ...props,
  });
}
