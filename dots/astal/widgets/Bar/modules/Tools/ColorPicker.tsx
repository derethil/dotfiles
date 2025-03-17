import { CircleButton } from "elements";
import { options } from "options";
import { bash } from "utils";

export function ColorPicker() {
  const handleClick = () => {
    const command = options.bar.tools.colorPicker.get();
    bash(command).catch(console.error);
  };

  return (
    <CircleButton onClick={handleClick} className="color-picker list-item">
      <icon icon="color-palette-symbolic" />
    </CircleButton>
  );
}
