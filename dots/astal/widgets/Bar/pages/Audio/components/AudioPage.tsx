import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp";
import { Separator } from "elements";
import { DashboardPage } from "widgets/Bar/elements/DashboardPage";
import { EndpointSelect } from "./EndpointSelect";

export function AudioPage() {
  const audio = AstalWp.get_default()?.audio;
  if (!audio) return null;

  return (
    <DashboardPage name="audio">
      <box className="section" vertical hexpand>
        <label className="heading" halign={Gtk.Align.START}>
          Active Speaker
        </label>
        <EndpointSelect
          endpoints={bind(audio, "speakers")}
          defaultEndpointId={bind(audio.defaultSpeaker, "id")}
        />
      </box>

      <Separator />

      <box className="section" vertical>
        <label className="heading" halign={Gtk.Align.START}>
          Active Microphone
        </label>
        <EndpointSelect
          endpoints={bind(audio, "microphones")}
          defaultEndpointId={bind(audio.defaultMicrophone, "id")}
        />
      </box>
    </DashboardPage>
  );
}
