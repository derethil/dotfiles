import { Gtk } from "astal/gtk3";

export type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export function animate<T extends Gtk.Widget>(
  widget: T,
  property: NumberKeys<T>,
  start: number,
  end: number,
  duration: number,
) {
  type Property = T[typeof property];

  if (isNaN(Number(widget[property]))) {
    throw new Error(`Property ${String(property)} is not a number`);
  }

  const startTime = widget.get_frame_clock()?.get_frame_time();
  const direction = end > start ? 1 : -1;

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

    widget[property] = (start + direction * t * Math.abs(end - start)) as Property;

    if (t >= 1) {
      widget.remove_tick_callback(id);
      return false;
    }

    return true;
  });
}
