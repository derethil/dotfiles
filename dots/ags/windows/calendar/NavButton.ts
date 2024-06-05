import { ButtonProps } from "types/widgets/button";

interface Props extends ButtonProps {
  icon: string;
}

export function NavButton(props: Props) {
  const { icon, ...rest } = props;
  return Widget.Button({
    cursor: "pointer",
    child: Widget.Icon({
      icon: props.icon,
    }),
    ...rest,
  });
}
