import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import AstalWp from "gi://AstalWp";
import { DashboardPage } from "widgets/Bar/elements/DashboardPage";
import { EndpointSelector } from "./EndpointSelector";

export function AudioPage() {
  const audio = AstalWp.get_default()?.audio;
  if (!audio) return null;

  return (
    <DashboardPage name="audio">
      <box className="section" vertical>
        <label className="heading" halign={Gtk.Align.START}>
          Active Speaker
        </label>
        <EndpointSelector
          endpoints={bind(audio, "speakers")}
          defaultEndpointId={bind(audio.defaultSpeaker, "id")}
        />
      </box>

      <box className="section" vertical>
        <label className="heading" halign={Gtk.Align.START}>
          Active Microphone
        </label>
        <EndpointSelector
          endpoints={bind(audio, "microphones")}
          defaultEndpointId={bind(audio.defaultMicrophone, "id")}
        />
      </box>
    </DashboardPage>
  );
}
