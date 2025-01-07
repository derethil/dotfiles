import { Binding, Variable } from "astal";
import { Astal, Gtk, Widget } from "astal/gtk3";
import { animate } from "lib/animate";
import { options } from "options";
import { clamp, toBinding } from "utils";
import { ChildProps } from "utils/children";

interface Props {
  child?: ChildProps["child"];
  value: Binding<number> | number;
  tooltip?: Binding<string> | string;
  animationDuration?: number;
  strokeWidth?: number;
  color?: Binding<string> | string;
  trackColor?: Binding<string> | string;
  disabled?: Binding<boolean> | boolean;
  size?: number;
  css?: string;
  rounded?: boolean;
  onScroll?: (direction: number) => void;
  onClick?: (event: Astal.ClickEvent) => void;
  onDestroy?: () => void;
}

export function CircleProgress(props: Props) {
  const value = toBinding(props.value);
  const css = Variable.derive(
    [
      toBinding(props.color),
      toBinding(props.trackColor),
      toBinding(props.disabled),
    ],
    (color, trackColor, disabled) =>
      `font-size: ${props.strokeWidth ?? 4}px;
      color: ${disabled ? options.theme.color.text.muted.get() : (color ?? "transparent")};
      background-color: ${trackColor ?? options.theme.color.background.highlight.get()};
      min-height: ${props.size ?? 36}px;
      min-width: ${props.size ?? 36}px;
      transition: all 0.15s ease-in-out;
  `,
  );

  const handleSetup = (self: Widget.CircularProgress) => {
    value.subscribe((newValue) => {
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

  const tooltipSetup = (self: Widget.EventBox) => {
    self.set_has_tooltip(true);
    self.connect("query-tooltip", (...params) => {
      const tooltip = params[4];
      toBinding(props.tooltip).subscribe((text) => {
        tooltip.set_text((text?.length ?? 0 > 0) ? text : null);
      });
      return true;
    });
  };

  const sursor = (props.onScroll ?? props.onClick) ? "pointer" : "default";

  return (
    <box className="circle-progress" onDestroy={props.onDestroy}>
      <eventbox
        setup={tooltipSetup}
        hasTooltip={Boolean(props.tooltip)}
        onScroll={(_, event) =>
          props.onScroll?.(clamp(event.delta_y, -1, 1) * -1)
        }
        cursor={sursor}
        onClick={(_, event) => props.onClick?.(event)}
      >
        <overlay
          cursor={sursor}
          overlay={
            <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
              {toBinding<ChildProps["child"]>(props.child).as(
                (child) => child ?? "",
              )}
            </box>
          }
        >
          <circularprogress
            rounded={props.rounded ?? true}
            css={css((ss) => ss + (props.css ?? ""))}
            onDestroy={() => css.drop()}
            value={value.get()}
            setup={handleSetup}
          />
        </overlay>
      </eventbox>
    </box>
  );
}
