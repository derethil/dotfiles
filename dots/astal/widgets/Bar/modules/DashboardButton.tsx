import { options } from "options";
import { DashboardState } from "../dashboardState";

export function DashboardButton() {
  const state = DashboardState.get_default();

  const icon = options.bar.position((position) => {
    return `view-${position.toLowerCase()}-pane-symbolic`;
  });

  return (
    <button
      className="dashboard-button"
      onClick={() => (state.reveal = !state.reveal)}
      cursor="pointer"
    >
      <icon icon={icon} />
    </button>
  );
}
