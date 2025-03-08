import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { FloatingWindow, TextEntry } from "elements";
import { OverlayType } from "state/overlay";
import { createKeyHandler } from "utils/binds";
import { SearchAdornment, Results } from "./elements";
import { PulseState } from "./state";

export const WINDOW_NAME = "pulse";

const state = PulseState.get_default();

export function Pulse() {
  const handleKeyPress = createKeyHandler(
    {
      key: Gdk.KEY_Escape,
      action: () => App.toggle_window(WINDOW_NAME),
    },
    {
      key: Gdk.KEY_n,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: (window) => window.child_focus(Gtk.DirectionType.DOWN),
    },
    {
      key: Gdk.KEY_p,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: (window) => window.child_focus(Gtk.DirectionType.UP),
    },
  );

  return (
    <FloatingWindow
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      className={WINDOW_NAME}
      visible={false}
      overlay={OverlayType.TRANSPARENT}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={App}
      heightRequest={700}
      onKeyPressEvent={handleKeyPress}
      setup={(self) => {
        self.hook(self, "notify::visible", () => {
          if (!self.visible) return (state.query = "");
          if (self.visible) state.entry?.grab_focus();
        });
      }}
    >
      <box className="pulse" widthRequest={550} vertical valign={Gtk.Align.START}>
        <box className={bind(state, "query").as((q) => (q ? "inactive" : ""))}>
          <icon className="start-icon" icon="system-search" />
          <TextEntry
            expand
            canFocus
            placeholderText={'Type ":" to list subcommands'}
            onKeyPressEvent={createKeyHandler({
              key: Gdk.KEY_Return,
              action: () => state.clickFirst(),
            })}
            text={bind(state, "query")}
            onChanged={(self) => (state.query = self.get_text())}
            setup={(self) => {
              self.grab_focus();
              state.entry = self;

              const connections = [
                self.connect("focus-in-event", () => (state.entryFocused = true)),
                self.connect("focus-out-event", () => (state.entryFocused = false)),
              ];

              self.connect("destroy", () =>
                connections.forEach((c) => self.disconnect(c)),
              );
            }}
          />
          <SearchAdornment />
        </box>
        <Results />
      </box>
    </FloatingWindow>
  );
}
