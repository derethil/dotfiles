import { ColorPicker } from "./ColorPicker";
import { PackageUpdates } from "./PackageUpdates";
import { ToggleDoNotDisturb } from "./ToggleDoNotDisturb";

export function Tools() {
  return (
    <box className="tools" vertical>
      <ToggleDoNotDisturb />
      <PackageUpdates />
      <ColorPicker />
    </box>
  );
}
