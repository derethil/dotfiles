import { options } from "options";
import { DashboardState } from "widgets/Dashboard";

export function DashboardButton() {
  const state = DashboardState.get_default();

  const icon = options.bar.position((position) => {
    return `view-${position.toLowerCase()}-pane-symbolic`;
  });

  const handleClick = () => {
    state.reveal = !state.reveal;
    if (!state.reveal) {
      state.page = state.defaultPage;
    }
  };

  return (
    <button className="dashboard-button" onClick={handleClick} cursor="pointer">
      <icon icon={icon} />
    </button>
  );
}
