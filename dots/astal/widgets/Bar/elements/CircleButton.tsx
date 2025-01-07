import { Binding } from "astal";
import { Astal } from "astal/gtk3";
import { CircleProgress } from "elements";
import { options } from "options";
import { ChildProps } from "utils/children";

interface Props extends ChildProps {
  onClick?: (event: Astal.ClickEvent) => void;
  tooltip?: Binding<string> | string;
}

export function CircleButton(props: Props) {
  return (
    <CircleProgress
      tooltip={props.tooltip}
      onClick={props.onClick}
      value={100}
      color={options.theme.color.background.highlight.get()}
    >
      {props.children}
      {props.child}
    </CircleProgress>
  );
}
