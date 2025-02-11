import { bind } from "astal";
import { WLSunset } from "lib/wlsunset";
import { notify } from "utils";

export function TemperatureSliders() {
  const sunset = WLSunset.get_default();

  return (
    <box className="sunset-sliders" hexpand vertical>
      <slider
        hexpand
        min={1000}
        max={8000}
        step={100}
        value={bind(sunset, "lowTemperature")}
        onButtonReleaseEvent={(self) => {
          notify(String(self.value));
        }}
      />

      <slider
        hexpand
        min={1000}
        step={100}
        max={8000}
        value={bind(sunset, "highTemperature")}
        onButtonReleaseEvent={(self) => {
          notify(String(self.value));
        }}
      />
    </box>
  );
}
