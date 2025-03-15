import { Binding, Variable } from "astal";
import { Astal, Gtk, Widget } from "astal/gtk3";
import { options } from "options";
import { clamp, toBinding } from "utils";
import { animate } from "utils/animate";
import { ChildProps } from "utils/children";

interface Props {
  child?: ChildProps["child"];
  className?: string;
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
  asTimeout?: boolean;
  linear?: boolean;
  onScroll?: (direction: number) => void;
  onClick?: (event: Astal.ClickEvent) => void;
  onDestroy?: () => void;
  onChange?: (value: number) => void;
  zeroPosition?: Degrees;
}

function degreesToClamped(degrees: number) {
  const float = degrees / 360;
  return clamp(float, 0, 1);
}

export function CircleProgress(props: Props) {
  let destroyed = false;
  const value = toBinding(props.value);

  const css = Variable.derive(
    [toBinding(props.color), toBinding(props.trackColor), toBinding(props.disabled)],
    (color, trackColor, disabled) =>
      `font-size: ${props.strokeWidth ?? 4}px;
      color: ${disabled ? options.theme.color.text.muted.get() : (color ?? "transparent")};
      background-color: ${trackColor ?? options.theme.color.background.highlight.get()};
      min-width: ${props.size ?? 36}px;
      transition: all 0.15s ease-in-out;
  `,
  );

  const handleAnimate = (self: Widget.CircularProgress, value: number) => {
    if (props.animationDuration === 0) {
      self.value = value;
    } else {
      const options: Parameters<typeof animate>[3] = {
        duration: props.animationDuration ?? 300,
      };
      if (!props.linear) options.bezier = [0.86, 0, 0.13, 1];
      animate(self, "value", value, options);
    }
  };

  const handleSetup = (self: Widget.CircularProgress) => {
    const valueConn = self.connect("notify::value", () => props.onChange?.(self.value));
    self.connect("destroy", () => self.disconnect(valueConn));

    if (props.asTimeout) {
      const realizeConn = self.connect("realize", () => handleAnimate(self, 0));
      self.connect("destroy", () => self.disconnect(realizeConn));
      return;
    }

    const unregister = value.subscribe((newValue) => {
      if (destroyed) return;
      handleAnimate(self, newValue);
    });

    self.connect("destroy", unregister);
  };

  const tooltipSetup = (self: Widget.EventBox) => {
    if (!props.tooltip) return;
    self.set_has_tooltip(true);
    const conn = self.connect("query-tooltip", (...params) => {
      const tooltip = params[4];
      const unregister = toBinding(props.tooltip).subscribe((text) => {
        tooltip.set_text((text?.length ?? 0 > 0) ? text : null);
      });
      self.connect("destroy", unregister);
      return true;
    });
    self.connect("destroy", () => self.disconnect(conn));
  };

  const sursor = (props.onScroll ?? props.onClick) ? "pointer" : "default";

  const handleDestroy = () => {
    props.onDestroy?.();
    css.drop();
    destroyed = true;
  };

  return (
    <box className={`circle-progress ${props.className}`}>
      <eventbox
        setup={tooltipSetup}
        hasTooltip={toBinding(props.tooltip).as((text) => (text?.length ?? 0) > 0)}
        onScroll={(_, event) => props.onScroll?.(clamp(event.delta_y, -1, 1) * -1)}
        cursor={sursor}
        onClick={(_, event) => props.onClick?.(event)}
      >
        <overlay
          cursor={sursor}
          overlay={
            <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
              {toBinding<ChildProps["child"]>(props.child).as((child) => child ?? "")}
            </box>
          }
        >
          <circularprogress
            startAt={degreesToClamped(props.zeroPosition ?? 270)}
            endAt={degreesToClamped(props.zeroPosition ?? 270)}
            rounded={props.rounded ?? true}
            css={css((ss) => ss + (props.css ?? ""))}
            onDestroy={handleDestroy}
            value={value.get()}
            setup={handleSetup}
          />
        </overlay>
      </eventbox>
    </box>
  );
}
