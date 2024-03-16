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
    overlays: [
      Widget.Revealer({
        revealChild: false,
        transitionDuration: transitionDuration ?? options.transition.value,
        transition: transition,
        child: Widget.Box({
          children: Overlay.bind().as((overlay) => (overlay ? [overlay] : [])),
        }),
        setup: (self) => {
          self.hook(Overlay, () => {
            self.reveal_child = !!Overlay.value;
          });
        },
      }),
    ],
  });

  return Object.assign(overlay, {
    setOverlay,
    resetOverlay,
  });
}
