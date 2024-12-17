import { bind } from "astal";
import { App, Astal, Gdk, Gtk, Widget } from "astal/gtk3";
import { FloatingWindow, TextEntry } from "elements";
import { OverlayType } from "state/overlay";
import { createKeyHandler } from "utils/binds";
import { StartAdornment, EndAdornment, Results } from "./elements";
import { Applications } from "./plugins";
import { PulseState } from "./state";

export const WINDOW_NAME = "pulse";

const state = PulseState.get_default();
state.pluginManager.registerPlugin(Applications);

export function Pulse() {
  const handleQueryChange = (text: string) => {
    state.query = text;
    if (text.length === 0) {
      state.endWidget = null;
    } else {
      state.endWidget = new Widget.Box({ child: new Widget.Label({ label: "hi" }) });
    }
  };

  const handleKeyPress = createKeyHandler(
    {
      key: Gdk.KEY_Escape,
      action: () => App.toggle_window(WINDOW_NAME),
    },
    {
      key: Gdk.KEY_Return,
      action: () => state.pluginManager.handleActivate(),
    },
    {
      key: Gdk.KEY_y,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: () => state.pluginManager.handleActivate(),
    },
    {
      key: Gdk.KEY_n,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: () => state.pluginManager.focused++,
    },
    {
      key: Gdk.KEY_p,
      mod: Gdk.ModifierType.CONTROL_MASK,
      action: () => state.pluginManager.focused--,
    },
  );

  return (
    <FloatingWindow
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      className={WINDOW_NAME}
      visible={false}
      overlay={OverlayType.BLUR}
      keymode={Astal.Keymode.EXCLUSIVE}
      application={App}
      onKeyPressEvent={(_, event) => handleKeyPress(event)}
      heightRequest={700}
      setup={(self) => {
        self.hook(self, "notify::visible", () => {
          if (self.visible) state.query = "";
        });
      }}
    >
      <box className="pulse" widthRequest={500} vertical valign={Gtk.Align.START}>
        <box>
          <StartAdornment />
          <TextEntry
            expand
            canFocus
            placeholderText={'Type ":" to list subcommands'}
            text={bind(state, "query")}
            onChanged={(self) => handleQueryChange(self.get_text())}
            onActivate={() => state.activate()}
            setup={(self) => self.grab_focus()}
          />
          <EndAdornment />
        </box>
        <Results />
      </box>
    </FloatingWindow>
  );
}
