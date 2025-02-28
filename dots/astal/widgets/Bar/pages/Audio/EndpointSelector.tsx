import { bind, Binding } from "astal";
import AstalWp from "gi://AstalWp";
import { OptionButton } from "widgets/Bar/elements/OptionButton";

function description(d: string) {
  const max = 36;
  return d.length > max ? d.slice(0, max) + "..." : d;
}

interface Props {
  endpoints: Binding<AstalWp.Endpoint[] | null>;
  defaultEndpointId: Binding<number>;
}

export function EndpointSelector(props: Props) {
  const { endpoints, defaultEndpointId } = props;

  const audio = AstalWp.get_default()?.audio;
  if (!audio) return null;

  return (
    <box vertical hexpand>
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
