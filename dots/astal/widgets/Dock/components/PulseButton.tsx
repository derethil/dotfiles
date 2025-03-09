import { App } from "astal/gtk3";
import { options } from "options";

export function PulseButton() {
  return (
    <button cursor="pointer" onClick={() => App.toggle_window("pulse")}>
      <icon
        icon="system-search-symbolic"
        css={options.dock.size().as((px) => `font-size: ${(px * 3) / 4}px`)}
      />
    </button>
  );
}
