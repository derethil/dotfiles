import { Binding, Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { ButtonProps } from "astal/gtk3/widget";
import AstalHyprland from "gi://AstalHyprland";
import { options } from "options";
import { attach } from "utils";
import { matchClient } from "../util/matchClient";

interface AppButtonProps extends ButtonProps {
  icon: string;
  term: string;
}

export function AppButton(props: AppButtonProps) {
  const { icon, term, ...rest } = props;

  const indicatorVisible = Variable(false);
  const hypr = AstalHyprland.get_default();

  const onClientUpdate = (self: Widget.Button) => {
    const running = hypr.clients.filter((c) => matchClient(c, term));
    indicatorVisible.set(running.length > 0);

    const text = running.length === 1 ? running[0].title : self.tooltipText;
    self.set_tooltip_text(text);
  };

  const handleSetup = (self: Widget.Button) => {
    const conns = [
      hypr.connect("client-added", () => onClientUpdate(self)),
      hypr.connect("client-removed", () => onClientUpdate(self)),
      hypr.connect("notify::focused-client", () => onClientUpdate(self)),
    ];

    onClientUpdate(self); // Initial indicator visibility
    self.connect("destroy", () => conns.forEach((c) => hypr.disconnect(c)));
    rest.setup?.(self);
  };

  return (
    <button {...rest} cursor="pointer" setup={handleSetup}>
      <overlay passThrough overlay={<Indicator visible={indicatorVisible()} />}>
        <icon icon={icon} css={options.dock.size().as((px) => `font-size: ${px}px`)} />
      </overlay>
    </button>
  );
}

interface IndicatorProps {
  visible: Binding<boolean>;
}

function Indicator(props: IndicatorProps) {
  const { visible } = props;

  return (
    <box valign={Gtk.Align.END} halign={Gtk.Align.CENTER}>
      <box
        className="indicator"
        setup={(self) =>
          attach(visible, (visible) => self.toggleClassName("shown", visible))
        }
      />
    </box>
  );
}
