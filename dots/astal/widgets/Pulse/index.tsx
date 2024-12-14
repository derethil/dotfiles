import { App, Astal, Gdk } from "astal/gtk3";
import { FloatingWindow } from "elements";
import { OverlayType } from "state/overlay";
import { EndAdornment } from "./elements/EndAdornment";
import { Entry } from "./elements/Entry";
import { StartAdornment } from "./elements/StartAdornment";
import { PulseState } from "./state";

export function Pulse() {
  const state = PulseState.get_default();

  const onWindowVisible = () => state.query.set("");

  const handleKeyPress = (self: Astal.Window, event: Gdk.Event) => {
    if (!(event.get_keyval()[1] === Gdk.KEY_Escape)) return;
    App.toggle_window(self.name);
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
        <Entry />
        <EndAdornment />
      </box>
    </FloatingWindow>
  );
}
