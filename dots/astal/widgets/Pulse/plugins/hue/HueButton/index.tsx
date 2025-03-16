import { bind } from "astal";
import { Group, Light } from "lib/hue";
import { attach } from "utils";
import { PulseResult } from "widgets/Pulse/elements/PulseResult";
import { ToggleButton } from "./ToggleButton";

export interface HueButtonProps {
  item: Group | Light;
}

export function HueButton(props: HueButtonProps) {
  const { item } = props;

  return (
    <PulseResult
      activate={() => item.toggle()}
      className="hue-button pulse-result-wrapper"
      setup={(self) => attach(bind(item, "on"), (on) => self.toggleClassName("on", on))}
    >
      <ToggleButton item={item} />
    </PulseResult>
  );
}
