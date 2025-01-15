import { bind } from "astal";
import Gdk from "gi://Gdk?version=3.0";
import { WLSunset } from "lib/wlsunset";
import { createKeyHandler } from "utils/binds";

export function ToggleSunset() {
  const sunset = WLSunset.get_default();

  const icon = bind(sunset, "enabled").as((enabled) => {
    if (enabled) return "moon-symbolic";
    return "brightness-symbolic";
  });

  const handleClick = () => {
    sunset.enabled = !sunset.enabled;
  };

  const onKeyPress = createKeyHandler({
    key: Gdk.KEY_Return,
    action: handleClick,
  });

  return (
    <button
      onClick={handleClick}
      onKeyPressEvent={onKeyPress}
      className="toggle-sunset"
      setup={(self) => {
        self.toggleClassName("enabled", sunset.enabled);
        bind(sunset, "enabled").subscribe((enabled) => {
          self.toggleClassName("enabled", enabled);
        });
      }}
    >
      <icon icon={icon} />
    </button>
  );
}
