import { Gdk } from "astal/gtk3";

interface Bind {
  key: number;
  mod?: Gdk.ModifierType;
  action: () => void;
}

export function createKeyHandler(...binds: Bind[]) {
  return (event: Gdk.Event) => {
    const eventKey = event.get_keyval()[1];
    const eventMod = event.get_state()[1];
    const bind = binds.find((bind) => {
      if (bind.key !== eventKey) return false;
      if (bind.mod && bind.mod !== eventMod) return false;
      return true;
    });
    if (bind) bind.action();
  };
}
