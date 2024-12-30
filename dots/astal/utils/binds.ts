import { Gdk, Gtk } from "astal/gtk3";

interface Bind {
  key: number;
  mod?: Gdk.ModifierType | Gdk.ModifierType[];
  action: (widget: Gtk.Widget, event: Gdk.Event) => unknown;
}

function isEventBind(bind: Bind, eventKey: number, eventMod: number) {
  if (bind.key !== eventKey) return false;
  if (bind.mod) {
    if (!Array.isArray(bind.mod) && !(bind.mod & eventMod)) return false;
    if (Array.isArray(bind.mod) && !bind.mod.some((mod) => mod & eventMod))
      return false;
  }
  return true;
}

export function createKeyHandler(...binds: Bind[]) {
  return (widget: Gtk.Widget, event: Gdk.Event) => {
    const eventKey = event.get_keyval()[1];
    const eventMod = event.get_state()[1];
    const pressedBind = binds.find((bind) =>
      isEventBind(bind, eventKey, eventMod),
    );
    if (pressedBind) pressedBind.action(widget, event);
  };
}
