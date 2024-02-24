import { EventBoxProps } from "types/widgets/eventbox";

type HoverRevealProps = EventBoxProps<any> & {
  indicator?: any;
  direction?: "left" | "right" | "down" | "up";
  duration?: number;
  setupRevealer?: (rev: ReturnType<typeof Widget.Revealer>) => void;
  setupEventBox?: (rev: ReturnType<typeof Widget.EventBox>) => void;
};

export default ({
  indicator,
  child,
  direction = "left",
  duration = 300,
  setupEventBox,
  setupRevealer,
  ...rest
}: HoverRevealProps) => {
  let open = false;
  const vertical = direction === "down" || direction === "up";
  const posStart = direction === "down" || direction === "right";
  const posEnd = direction === "up" || direction === "left";

  const revealer = Widget.Revealer({
    // @ts-ignore
    transition: `slide_${direction}`,
    setup: setupRevealer,
    transition_duration: duration,
    child,
  });

  const eventbox = Widget.EventBox({
    ...rest,
    setup: setupEventBox,
    on_hover: () => {
      if (open) return;

      revealer.reveal_child = true;
      Utils.timeout(duration, () => (open = true));
    },
    on_hover_lost: () => {
      if (!open) return;

      revealer.reveal_child = false;
      open = false;
    },
    child: Widget.Box({
      vertical,
      children: [posStart && indicator, revealer, posEnd && indicator],
    }),
  });

  return eventbox;
};
