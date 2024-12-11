import { Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";

const END_ADORNMENT_TRANSITION_DURATION = 200;

export function EndAdornmentState() {
  const endAdornment = Variable<Widget.Box | null>(null);
  const showEndAdornment = Variable(false);

  showEndAdornment.subscribe((shown) => {
    if (shown) return;
    setTimeout(() => endAdornment.set(null), END_ADORNMENT_TRANSITION_DURATION);
  });

  endAdornment.subscribe((widget) => {
    if (widget === null) return;
    showEndAdornment.set(true);
  });

  const hide = () => showEndAdornment.set(false);
  const set = (widget: Widget.Box) => endAdornment.set(widget);

  return {
    widget: endAdornment(),
    shown: showEndAdornment(),
    hide,
    set,
    drop: () => {
      endAdornment.drop();
      showEndAdornment.drop();
    },
  };
}

export function EndAdornment() {
  const endAdornment = EndAdornmentState();

  const widget = (
    <revealer
      revealChild={endAdornment.shown}
      transitionDuration={END_ADORNMENT_TRANSITION_DURATION}
      transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      onDestroy={endAdornment.drop}
    >
      {endAdornment.widget}
    </revealer>
  );

  return {
    revaler: widget,
    hide: endAdornment.hide,
    set: endAdornment.set,
  };
}
