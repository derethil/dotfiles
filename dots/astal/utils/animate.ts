import { Gtk } from "astal/gtk3";
import bezier from "bezier-easing";

type BezierArray = [number, number, number, number];

interface Options {
  from?: number;
  duration: Milliseconds;
  bezier?: BezierArray;
}

export function animate<T extends Gtk.Widget>(
  widget: T,
  property: KeysOfType<T, number>,
  to: number,
  options: Options,
) {
  type Property = T[typeof property];

  const from = options.from ?? (widget[property] as number);
  const duration = options.duration;

  if (isNaN(Number(widget[property])))
    throw new Error(`Property ${String(property)} is not a number`);

  const startTime = widget.get_frame_clock()?.get_frame_time();
  const direction = to > from ? 1 : -1;

  if (!startTime)
    throw new Error(
      `Failed to get widget frame clock for ${widget.constructor.name}, widget may not be realized`,
    );

  const id = widget.add_tick_callback(() => {
    if (widget.destroyed(widget)) {
      widget.remove_tick_callback(id);
      return false;
    }

    const currentTime = widget.get_frame_clock()?.get_frame_time();
    if (!currentTime) return false;

    const elapsed = (currentTime - startTime) / 1000;
    const easing = bezier(...(options.bezier ?? [0, 0, 1, 1]));

    const t = Math.min(1, elapsed / duration);
    const value = from + direction * easing(t) * Math.abs(to - from);
    widget[property] = value as Property;

    if (t >= 1) {
      widget.remove_tick_callback(id);
      return false;
    }

    return true;
  });
}
