import { bind, Binding } from "astal";
import { Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp";
import { OptionButton } from "widgets/Dashboard";

function description(d: string) {
  const max = 30;
  return d.length > max ? d.slice(0, max) + "..." : d;
}

interface Props {
  endpoints: Binding<AstalWp.Endpoint[] | null>;
  defaultEndpointId: Binding<number>;
}

export function EndpointSelect(props: Props) {
  const { endpoints, defaultEndpointId } = props;

  const audio = AstalWp.get_default()?.audio;
  if (!audio) return null;

  return (
    <box vertical hexpand halign={Gtk.Align.FILL} className="endpoint-select">
      {bind(endpoints).as((endpoints) =>
        (endpoints ?? []).map((endpoint) => (
          <OptionButton
            active={defaultEndpointId.as((id) => id === endpoint.id)}
            onClick={() => (endpoint.isDefault = true)}
          >
            <label label={description(endpoint.description)} />
          </OptionButton>
        )),
      )}
    </box>
  );
}
