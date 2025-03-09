import { exec } from "astal";
import { options } from "options";

export function OverviewButton() {
  const handleOpenOverview = () => {
    exec("hyprctl dispatch hyprexpo:expo enable");
  };

  return (
    <button className="dock-button" cursor="pointer" onClickRelease={handleOpenOverview}>
      <icon
        icon="view-app-grid-symbolic"
        css={options.dock.size().as((px) => `font-size: ${px}px`)}
      />
    </button>
  );
}
