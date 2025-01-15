import { options } from "options";
import { bash } from "utils";
import { CircleButton } from "widgets/Bar/elements";

export function ColorPicker() {
  const handleClick = () => {
    const command = options.bar.tools.colorPicker.get();
    bash(command).catch(console.error);
  };

  return (
    <CircleButton onClick={handleClick} className="color-picker">
      <icon icon="color-palette-symbolic" />
    </CircleButton>
  );
}
