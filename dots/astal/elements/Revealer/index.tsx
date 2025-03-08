import { bind } from "astal";
import { Widget } from "astal/gtk3";
import { ChildProps } from "utils/children";
import { RevealerState } from "./state";

type BaseProps = Omit<Widget.RevealerProps, "child"> & ChildProps;

export interface RevealerProps extends BaseProps {
  wrapperProps?: Omit<Widget.BoxProps, "children" | "child">;
}

export function Revealer(props: RevealerProps) {
  const { child: _, ...rest } = props;
  const state = new RevealerState(props);

  const wrapperSetup = (self: Widget.Box) => {
    self.noImplicitDestroy = true;
    props.wrapperProps?.setup?.(self);
  };

  return (
    <revealer
      {...rest}
      transitionDuration={props.transitionDuration}
      onDestroy={() => state.onDestroy()}
      revealChild={bind(state, "reveal")}
    >
      <box {...props.wrapperProps} setup={wrapperSetup}>
        {bind(state, "children")}
      </box>
    </revealer>
  );
}
