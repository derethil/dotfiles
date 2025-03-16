import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Separator } from "elements";
import { Hue } from "lib/hue";
import { DashboardPage } from "widgets/Bar/elements/DashboardPage";
import { ItemCard } from "./ItemCard";

export function HuePage() {
  const hue = Hue.get_default();

  if (!hue.enabled) {
    return <DashboardPage name="hue">HueADM is not set up on this device.</DashboardPage>;
  }

  return (
    <DashboardPage name="hue">
      <box className="section" vertical hexpand>
        <label className="heading" halign={Gtk.Align.START}>
          Rooms
        </label>

        {bind(hue, "groups").as((groups) =>
          groups.map((group) => <ItemCard item={group} />),
        )}
      </box>

      <Separator />

      <box className="section" vertical hexpand>
        <label className="heading" halign={Gtk.Align.START}>
          Lights
        </label>

        {bind(hue, "lights").as((lights) =>
          lights.map((light) => <ItemCard item={light} />),
        )}
      </box>
    </DashboardPage>
  );
}
