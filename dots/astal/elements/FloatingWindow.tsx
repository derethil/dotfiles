import { App, Astal, Widget } from "astal/gtk3";
import {
  activeOverlayWindows,
  DismissableWindows,
  OverlayType,
  OverlayWindows,
} from "state/overlay";

interface Props extends Widget.WindowProps {
  name: string;
  overlay?: OverlayType;
  dismissable?: boolean;
}

const onChangeVisible = (overlay: OverlayType) => {
  const overlayWindow = App.get_window(`overlay-${overlay}`);
  overlayWindow?.set_visible(activeOverlayWindows(overlay).length > 0);
};

export function FloatingWindow({
  application = App,
  layer = Astal.Layer.OVERLAY,
  visible = false,
  overlay = OverlayType.TRANSPARENT,
  dismissable = true,
  ...props
}: Props) {
  return (
    <window
      className={`floating-window ${props.name}`}
      application={application}
      layer={layer}
      {...props}
      visible={visible}
      setup={(self) => {
        OverlayWindows[overlay].push(self.name);
        if (dismissable) DismissableWindows.push(self.name);
        self.hook(self, "notify::visible", () => onChangeVisible(overlay));
        props.setup?.(self);
      }}
    >
      {props.child}
    </window>
  );
}
