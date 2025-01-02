import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { FloatingWindow, TextEntry } from "elements";
import { OverlayType } from "state/overlay";
import { createKeyHandler } from "utils/binds";
import { SearchAdornment, Results } from "./elements";
import { Applications, PluginAutocomplete, PluginPowerMenu } from "./plugins";
import { PulseState } from "./state";

export const WINDOW_NAME = "pulse";

const state = PulseState.get_default();
state.registerPlugin(Applications);
state.registerPlugin(PluginAutocomplete);
state.registerPlugin(PluginPowerMenu);

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

  const handleQueryChange = (text: string) => (state.query = text);

  return (
    <FloatingWindow
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      className={WINDOW_NAME}
      visible={false}
      overlay={OverlayType.BLUR}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={App}
      heightRequest={700}
      onKeyPressEvent={handleKeyPress}
      setup={(self) => {
        self.hook(self, "notify::visible", () => {
          if (self.visible) state.query = "";
        });
      }}
    >
      <box
        className="pulse"
        widthRequest={500}
        vertical
        valign={Gtk.Align.START}
      >
        <box className={bind(state, "query").as((q) => (q ? "inactive" : ""))}>
          <icon className="start-icon" icon="system-search" />
          <TextEntry
            expand
            canFocus
            placeholderText={'Type ":" to list subcommands'}
            onActivate={() => state.clickFirst()}
            text={bind(state, "query")}
            onChanged={(self) => handleQueryChange(self.get_text())}
            setup={(self) => {
              self.grab_focus();
              state.entry = self;
            }}
          />
          <SearchAdornment />
        </box>
        <Results />
      </box>
    </FloatingWindow>
  );
}
