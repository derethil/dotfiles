import { Variable } from "astal";
import { App, Astal, Gdk, Widget } from "astal/gtk3";
import { FloatingWindow } from "elements/FloatingWindow";
import { OverlayType } from "state/overlay";
import { EndAdornment } from "./EndAdornment";

export function Pulse() {
  const endAdornment = EndAdornment();
  const iconName = Variable("system-search");
  const query = Variable("");

  const handleKeyPress = (self: Astal.Window, event: Gdk.Event) => {
    if (!(event.get_keyval()[1] === Gdk.KEY_Escape)) return;
    App.toggle_window(self.name);
  };

  const handleQueryChange = (text: string) => {
    query.set(text);
    if (text.length === 0) {
      endAdornment.hide();
    } else {
      endAdornment.set(new Widget.Box({ child: new Widget.Label({ label: "hi" }) }));
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
        self.hook(self, "notify::visible", () => !self.visible && query.set(""));
      }}
      onDestroy={() => {
        query.drop();
        iconName.drop();
      }}
    >
      <box className="pulse" widthRequest={400}>
        <icon icon={iconName()} />
        <entry
          text={query()}
          expand
          canFocus
          onChanged={(self) => handleQueryChange(self.get_text())}
          onActivate={() => {
            console.log(query.get());
          }}
          setup={(self) => self.grab_focus()}
        />
        {endAdornment.revaler}
      </box>
    </FloatingWindow>
  );
}
