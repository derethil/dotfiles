import { App, Gdk, Gtk } from "astal/gtk3";
import { ButtonProps } from "astal/gtk3/widget";
import { createKeyHandler } from "utils/binds";
import { WINDOW_NAME } from "widgets/Pulse";

interface Props extends ButtonProps {
  activate: (button: Gtk.Widget) => void | Promise<void>;
  type: string;
}

export function Action(props: Props) {
  const handleAction = (self: Gtk.Widget) => {
    App.toggle_window(WINDOW_NAME);
    props.activate(self)?.catch(console.error);
  };

  const handleKeyPress = createKeyHandler(
    {
      key: Gdk.KEY_Return,
      action: handleAction,
    },
    {
      key: Gdk.KEY_y,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: handleAction,
    },
  );

  return (
    <button
      expand
      heightRequest={60}
      widthRequest={60}
      className={`action ${props.type}`}
      onKeyPressEvent={handleKeyPress}
      onClick={(self) => handleAction(self)}
      {...props}
    />
  );
}
