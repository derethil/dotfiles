import Gtk from "gi://Gtk?version=3.0";
import { OverlayProps } from "types/widgets/overlay";
import { RevealerProps } from "types/widgets/revealer";

type excluded = "overlays";
interface OverlayRevealerProps extends Omit<OverlayProps, excluded> {
  transition: RevealerProps["transition"];
  transitionDuration?: RevealerProps["transitionDuration"];
}

export function OverlayRevaler(props: OverlayRevealerProps) {
  const { transition, transitionDuration, ...revealerProps } = props;
  const Overlay = Variable<Gtk.Widget | null>(null);

  const resetOverlay = () => Overlay.setValue(null);
  const setOverlay = (overlay: Gtk.Widget) => Overlay.setValue(overlay);

  const overlay = Widget.Overlay({
    ...revealerProps,
    overlays: Overlay.bind().as((overlay) => (overlay === null ? [] : [overlay])),
  });

  return Object.assign(overlay, {
    setOverlay,
    resetOverlay,
  });
}
