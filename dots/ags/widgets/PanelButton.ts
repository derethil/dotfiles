import { ButtonProps } from "types/widgets/button"
import { BoxProps } from "types/widgets/box";

type PanelButtonProps = ButtonProps & {
  children?: BoxProps["children"];
  window?: string;
  flat?: boolean;
};

export function PanelButton({
  window = "",
  flat,
  child,
  setup,
  ...rest
}: PanelButtonProps) {
  return Widget.Button({
    child: Widget.Box({ child }),
    setup: (self) => {
      let open = false;

      self.toggleClassName("panel-button");
      self.toggleClassName(window);

      self.hook(options.bar.flatButtons, () => {
        self.toggleClassName("flat", flat ?? options.bar.flatButtons.value);
      });

      self.hook(App, (_, win, visible) => {
        if (win !== window) return;

        if (open && !visible) {
          open = false;
          self.toggleClassName("active", false);
        }

        if (visible) {
          open = true;
          self.toggleClassName("active");
        }
      });

      if (setup) setup(self);
    },
    ...rest,
  });
}