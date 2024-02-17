import { BoxProps } from "types/widgets/box";
import { EventBoxProps } from "types/widgets/eventbox";

type PanelModuleProps = EventBoxProps & {
  flat?: boolean;
};

export default ({ flat, child, setup, ...rest }: PanelModuleProps) =>
  Widget.EventBox({
    child: Widget.Box({ child }),
    setup: (self) => {
      self.toggleClassName("panel-button");

      self.hook(options.bar.flatButtons, () => {
        self.toggleClassName("flat", flat ?? options.bar.flatButtons.value);
      });

      if (setup) setup(self);
    },
    ...rest,
  });
