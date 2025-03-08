import { Gtk } from "astal/gtk3";
import { ButtonProps } from "astal/gtk3/widget";
import { options } from "options";
import { IndicatedButton } from "./IndicatedButton";

interface Props extends ButtonProps {
  icon: string;
  pinned?: boolean;
}

export function AppButton(props: Props) {
  const { icon, pinned = false, ...rest } = props;

  const indicator = (
    <box valign={Gtk.Align.END} halign={Gtk.Align.CENTER}>
      <box className="indicator" visible={true} />
    </box>
  );

  return (
    <IndicatedButton
      {...rest}
      indicator={indicator}
      className="dock-button"
      cursor="pointer"
      setup={(self) => {
        rest.setup?.(self);
      }}
    >
      <overlay passThrough overlays={pinned ? [indicator] : []}>
        <icon icon={icon} css={options.dock.size().as((px) => `font-size: ${px}px`)} />
      </overlay>
    </IndicatedButton>
  );
}
