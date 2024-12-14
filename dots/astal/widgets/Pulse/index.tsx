import { bind } from "astal";
import { App, Astal, Gdk, Gtk, Widget } from "astal/gtk3";
import { FloatingWindow, TextEntry } from "elements";
import { OverlayType } from "state/overlay";
import { StartAdornment, EndAdornment, Results } from "./elements";
import { Applications } from "./plugins";
import { PulseState } from "./state";

export const WINDOW_NAME = "pulse";

const state = PulseState.get_default();
state.registerPlugin(Applications);

export function Pulse() {
  const handleKeyPress = (self: Astal.Window, event: Gdk.Event) => {
    if (!(event.get_keyval()[1] === Gdk.KEY_Escape)) return;
    App.toggle_window(self.name);
  };

  const handleQueryChange = (text: string) => {
    state.query = text;
    if (text.length === 0) {
      state.endWidget = null;
    } else {
      state.endWidget = new Widget.Box({ child: new Widget.Label({ label: "hi" }) });
    }
  };

  return (
    <FloatingWindow
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      className={WINDOW_NAME}
      visible={false}
      overlay={OverlayType.BLUR}
      keymode={Astal.Keymode.ON_DEMAND}
      application={App}
      onKeyPressEvent={handleKeyPress}
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
