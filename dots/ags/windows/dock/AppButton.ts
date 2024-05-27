import { range } from "lib/utils";
import { ButtonProps } from "types/widgets/button";

interface Props extends ButtonProps {
  icon: string;
  pinned?: boolean;
}

export function AppButton({ icon, pinned = false, ...rest }: Props) {
  const indicators = Widget.Box({
    vpack: "end",
    hpack: "center",
    child: Widget.Box({
      className: "indicator",
      visible: false,
    }),
  });

  return Widget.Button({
    ...rest,
    attribute: indicators as ButtonProps["attribute"],
    child: Widget.Box({
      child: Widget.Overlay({
        passThrough: true,
        overlays: pinned ? [indicators] : [],
        child: Widget.Icon({
          icon,
          size: options.dock.iconSize.bind(),
        }),
      }),
    }),
  });
}
