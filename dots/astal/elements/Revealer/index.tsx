import { bind } from "astal";
import { Widget } from "astal/gtk3";
import { options } from "options";
import { ChildProps } from "utils/children";
import { RevealerState } from "./state";

type RevealerProps = Omit<Widget.RevealerProps, "child"> & ChildProps;

interface Props extends RevealerProps {
  wrapperProps?: Omit<Widget.BoxProps, "children" | "child">;
}

export function Revealer(props: Props) {
  const state = new RevealerState(
    props,
    props.transitionDuration ?? options.theme.transition(),
  );

  const wrapperSetup = (self: Widget.Box) => {
    self.noImplicitDestroy = true;
    props.wrapperProps?.setup?.(self);
  };

  const { child: _, ...rest } = props;

  return (
    <revealer
      {...rest}
      transitionDuration={props.transitionDuration}
      revealChild={bind(state, "reveal")}
    >
      <box {...props.wrapperProps} setup={wrapperSetup}>
        {bind(state, "children")}
      </box>
    </revealer>
  );
}
