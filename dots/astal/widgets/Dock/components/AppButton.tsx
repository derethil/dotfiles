import { Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { ButtonProps } from "astal/gtk3/widget";
import AstalHyprland from "gi://AstalHyprland";
import { options } from "options";
import { attach } from "utils";
import { matchClient } from "../util/matchClient";

interface Props extends ButtonProps {
  icon: string;
  term: string;
  pinned?: boolean;
}

export function AppButton(props: Props) {
  const { icon, term, pinned = false, ...rest } = props;

  const indicatorVisible = Variable(false);
  const hypr = AstalHyprland.get_default();

  const onClientUpdate = (self: Widget.Button) => {
    const running = hypr.clients.filter((c) => matchClient(c, term));
    indicatorVisible.set(running.length > 0);

    const text = running.length === 1 ? running[0].title : self.tooltipText;
    self.set_tooltip_text(text);
  };

  return (
    <button
      {...rest}
      className="dock-button"
      cursor="pointer"
      setup={(self) => {
        const conns = [
          hypr.connect("client-added", () => onClientUpdate(self)),
          hypr.connect("client-removed", () => onClientUpdate(self)),
          hypr.connect("notify::focused-client", () => onClientUpdate(self)),
        ];

        onClientUpdate(self); // Initial indicator visibility
        self.connect("destroy", () => conns.forEach((c) => hypr.disconnect(c)));
        rest.setup?.(self);
      }}
    >
      <overlay
        passThrough
        overlay={
          pinned ? (
            <box valign={Gtk.Align.END} halign={Gtk.Align.CENTER}>
              <box
                className="indicator"
                setup={(self) =>
                  attach(indicatorVisible(), (visible) =>
                    self.toggleClassName("shown", visible),
                  )
                }
              />
            </box>
          ) : undefined
        }
      >
        <icon icon={icon} css={options.dock.size().as((px) => `font-size: ${px}px`)} />
      </overlay>
    </button>
  );
}
