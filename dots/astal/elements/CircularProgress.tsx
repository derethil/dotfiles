import { Binding } from "astal";
import { animate } from "lib/animate";

interface Props {
  value: Binding<number>;
  animationDuration?: number;
}

export function CircleProgress({ value, ...options }: Props) {
  return (
    <circularprogress
      setup={(self) => {
        self.value = value.get();
        value.subscribe((newValue) => {
          if (options.animationDuration === 0) {
            self.value = newValue;
          } else {
            animate(self, "value", self.value, newValue, options.animationDuration ?? 200);
          }
        });
      }}
    />
  );
}
