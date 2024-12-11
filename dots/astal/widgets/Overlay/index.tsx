import { App, Astal } from "astal/gtk3";
import { activeOverlayWindows, OverlayType } from "state/overlay";

interface OverlayProps {
  type: OverlayType;
  className?: string;
}

export function Overlay({ type, className }: OverlayProps) {
  return (
    <window
      visible={false}
      name={`overlay-${type}`}
      namespace={`overlay-${type}`}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      keymode={Astal.Keymode.NONE}
      application={App}
      className={`overlay ${className}`}
      setup={(self) => {
        self.hook(self, "notify::visible", () => {
          if (self.visible) return;
          activeOverlayWindows(type).forEach((window) =>
            App.get_window(window.name)?.set_visible(false),
          );
        });
      }}
    >
      <eventbox vexpand hexpand onClick={(self) => (self.parent.visible = false)} />
    </window>
  );
}
