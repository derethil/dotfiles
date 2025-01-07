import { Gtk } from "astal/gtk3";
import Apps from "gi://AstalApps";
import { icon } from "utils";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { PulseState } from "widgets/Pulse/state";

interface Props {
  app: Apps.Application;
}

export function AppButton(props: Props) {
  const state = PulseState.get_default();
  const activate = () => state.activate(() => props.app.launch());

  return (
    <PulseResult className="application" activate={activate}>
      <icon
        icon={icon(props.app.iconName, "application-x-executable-symbolic")}
      />
      <box vertical halign={Gtk.Align.START} valign={Gtk.Align.CENTER}>
        <label label={props.app.name} halign={Gtk.Align.START} />
        {props.app.description && (
          <label
            wrap
            justify={Gtk.Justification.FILL}
            label={props.app.description}
          />
        )}
      </box>
    </PulseResult>
  );
}
