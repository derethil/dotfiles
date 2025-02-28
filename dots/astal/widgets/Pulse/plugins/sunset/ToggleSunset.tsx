import { bind } from "astal";
import Gdk from "gi://Gdk?version=3.0";
import { WLSunset } from "lib/wlsunset";
import { attach } from "utils";
import { createKeyHandler } from "utils/binds";

export function ToggleSunset() {
  const sunset = WLSunset.get_default();
  const handleClick = () => (sunset.enabled = !sunset.enabled);

  const icon = bind(sunset, "enabled").as((enabled) => {
    if (enabled) return "moon-symbolic";
    return "brightness-symbolic";
  });

  const onKeyPress = createKeyHandler({
    key: Gdk.KEY_Return,
    action: handleClick,
  });

  const enabled = bind(sunset, "enabled");

  return (
    <button
      cursor="pointer"
      onClick={handleClick}
      onKeyPressEvent={onKeyPress}
      className="toggle-sunset"
      setup={(self) => {
        attach(enabled, (enabled) => self.toggleClassName("enabled", enabled));
      }}
    >
      <icon icon={icon} />
    </button>
  );
}
