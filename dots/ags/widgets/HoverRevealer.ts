import { EventBoxProps } from "types/widgets/eventbox";

type HoverRevealProps = EventBoxProps<any> & {
  indicator?: any;
  direction?: "left" | "right" | "down" | "up";
  duration?: number;
  setupRevealer?: (rev: ReturnType<typeof Widget.Revealer>) => void;
  setupEventBox?: (rev: ReturnType<typeof Widget.EventBox>) => void;
};

export function HoverRevealer({
  indicator,
  child,
  direction = "left",
  duration = 300,
  setupEventBox,
  setupRevealer,
  ...rest
}: HoverRevealProps) {
  const vertical = direction === "down" || direction === "up";
  const posStart = direction === "down" || direction === "right";
  const posEnd = direction === "up" || direction === "left";

  const revealer = Widget.Revealer({
    transition: `slide_${direction}`,
    setup: setupRevealer,
    transitionDuration: duration,
    child,
  });

  const handleHoverEvent = (hover: boolean) => {
    if (hover !== revealer.reveal_child) revealer.reveal_child = hover;
  };

  const eventbox = Widget.EventBox({
    ...rest,
    child: Widget.Box({
      vertical,
      children: [posStart && indicator, revealer, posEnd && indicator],
    }),
    setup: (eb) => {
      eb.on("enter-notify-event", () => handleHoverEvent(true));
      eb.on("leave-notify-event", () => handleHoverEvent(false));
      setupEventBox?.(eb);
    },
  });

  return eventbox;
}
