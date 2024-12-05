import { Binding, Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { animate } from "lib/animate";
import { options } from "options";
import { toBinding } from "utils";

type Child = JSX.Element | Binding<JSX.Element>;

interface Props {
  child: Child;
  value: Binding<number>;
  animationDuration?: number;
  strokeWidth?: number;
  color: Binding<string> | string;
  trackColor?: Binding<string> | string;
  disabled?: Binding<boolean> | boolean;
  size?: number;
  css?: string;
  rounded?: boolean;
}

export function CircleProgress(props: Props) {
  const css = Variable.derive(
    [toBinding(props.color), toBinding(props.trackColor), toBinding(props.disabled)],
    (color, trackColor, disabled) => `
      font-size: ${props.strokeWidth ?? 4}px;
      color: ${disabled ? options.theme.color.text.muted.get() : color};
      background-color: ${trackColor ?? options.theme.color.background.highlight.get()};
      min-height: ${props.size ?? 36}px;
      min-width: ${props.size ?? 36}px;
      transition: all 0.15s ease-in-out;
  `,
  );

  const handleSetup = (self: Widget.CircularProgress) => {
    props.value.subscribe((newValue) => {
      if (props.animationDuration === 0) {
        self.value = newValue;
      } else {
        animate(self, "value", newValue, {
          duration: props.animationDuration ?? 300,
          bezier: [0.86, 0, 0.13, 1],
        });
      }
    });
  };

  return (
    <box>
      <overlay
        overlay={
          <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
            {toBinding(props.child)}
          </box>
        }
      >
        <circularprogress
          rounded={props.rounded ?? true}
          css={css((ss) => ss + (props.css ?? ""))}
          onDestroy={() => css.drop()}
          value={props.value.get()}
          setup={handleSetup}
        />
      </overlay>
    </box>
  );
}
