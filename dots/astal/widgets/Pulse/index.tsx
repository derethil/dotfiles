import { bind } from "astal";
import { App, Astal, Gdk, Widget } from "astal/gtk3";
import { FloatingWindow, TextEntry } from "elements";
import { OverlayType } from "state/overlay";
import { EndAdornment } from "./elements/EndAdornment";
import { StartAdornment } from "./elements/StartAdornment";
import { PulseState } from "./state";

const state = PulseState.get_default();

export function Pulse() {
  const onWindowVisible = () => (state.query = "");

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
      name="pulse"
      namespace="pulse"
      className="pulse"
      visible={false}
      overlay={OverlayType.BLUR}
      keymode={Astal.Keymode.ON_DEMAND}
      application={App}
      onKeyPressEvent={handleKeyPress}
      setup={(self) => {
        self.hook(self, "notify::visible", () => {
          if (self.visible) onWindowVisible();
        });
      }}
    >
      <box className="pulse" widthRequest={500}>
        <StartAdornment />
        <TextEntry
          expand
          canFocus
          placeholderText={'Type ":" to list subcommands'}
          text={bind(state, "query")}
          onChanged={(self) => handleQueryChange(self.get_text())}
          onActivate={(self) => console.log(self.get_text())}
          setup={(self) => self.grab_focus()}
        />
        <EndAdornment />
      </box>
    </FloatingWindow>
  );
}
