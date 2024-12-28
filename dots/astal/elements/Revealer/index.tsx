import { bind, Binding } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { RevealerState } from "./state";

interface Props extends Omit<Widget.RevealerProps, "child" | "revealChild"> {
  content: Binding<Gtk.Widget[]> | Binding<Gtk.Widget | null>;
  wrapperProps?: Omit<Widget.BoxProps, "children" | "child">;
}

export function Revealer(props: Props) {
  const state = new RevealerState(props.content);

  const wrapperSetup = (self: Widget.Box) => {
    self.noImplicitDestroy = true;
    props.wrapperProps?.setup?.(self);
  };

  return (
    <revealer
      {...props}
      transitionDuration={props.transitionDuration}
      revealChild={bind(state, "reveal")}
    >
      <box {...props.wrapperProps} setup={wrapperSetup}>
        {bind(state, "children")}
      </box>
    </revealer>
  );
}
