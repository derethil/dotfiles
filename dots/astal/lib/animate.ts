import { Gtk } from "astal/gtk3";

export function animate<T extends Gtk.Widget>(
  widget: T,
  property: KeysOfType<T, number>,
  from: number,
  to: number,
  duration: Milliseconds,
) {
  type Property = T[typeof property];

  if (isNaN(Number(widget[property]))) {
    throw new Error(`Property ${String(property)} is not a number`);
  }

  const startTime = widget.get_frame_clock()?.get_frame_time();
  const direction = to > from ? 1 : -1;

  if (!startTime) {
    throw new Error(
      `Failed to get widget frame clock for ${widget.constructor.name}, widget may not be realized`,
    );
  }

  const id = widget.add_tick_callback(() => {
    const currentTime = widget.get_frame_clock()?.get_frame_time();
    if (!currentTime) return false;

    const elapsed = (currentTime - startTime) / 1000;

    const t = Math.min(elapsed / duration, 1);

    widget[property] = (from + direction * t * Math.abs(to - from)) as Property;

    if (t >= 1) {
      widget.remove_tick_callback(id);
      return false;
    }

    return true;
  });
}
