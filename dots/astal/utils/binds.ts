import { Astal, Gdk, Gtk } from "astal/gtk3";

type Event = Gdk.Event | Astal.ClickEvent;

interface Bind<T extends Event> {
  key: number;
  mod?: Gdk.ModifierType | Gdk.ModifierType[];
  action: (widget: Gtk.Widget, event: T) => unknown;
}

function isEventBound<T extends Event>(
  bind: Bind<T>,
  eventKey: number,
  eventMod: number,
) {
  if (bind.key !== eventKey) return false;
  if (bind.mod) {
    if (!Array.isArray(bind.mod) && !(bind.mod & eventMod)) return false;
    if (Array.isArray(bind.mod) && !bind.mod.some((mod) => mod & eventMod)) return false;
  }
  return true;
}

export function createKeyHandler(...binds: Bind<Gdk.Event>[]) {
  return (widget: Gtk.Widget, event: Gdk.Event) => {
    const eventKey = event.get_keyval()[1];
    const eventMod = event.get_state()[1];
    const boundTo = binds.find((b) => isEventBound(b, eventKey, eventMod));
    if (boundTo) boundTo.action(widget, event);
  };
}

export function createClickHandler(...binds: Bind<Astal.ClickEvent>[]) {
  return (widget: Gtk.Widget, event: Astal.ClickEvent) => {
    const button = event.button;
    const mod = event.modifier;
    const boundTo = binds.find((b) => isEventBound(b, button, mod));
    if (boundTo) boundTo.action(widget, event);
  };
}
