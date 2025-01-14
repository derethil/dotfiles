import { PackageUpdates } from "./PackageUpdates";
import { ToggleDoNotDisturb } from "./ToggleDoNotDisturb";

export function Tools() {
  return (
    <box className="tools" vertical>
      <PackageUpdates />
      <ToggleDoNotDisturb />
    </box>
  );
}
