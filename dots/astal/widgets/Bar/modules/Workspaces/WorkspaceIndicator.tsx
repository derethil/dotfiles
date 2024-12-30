import { bind, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import { isUrgent } from "./isUrgent";

interface WorkspaceProps {
  id: number;
}

function observeWorkspace(id: number) {
  const hypr = Hyprland.get_default();

  const get = () =>
    hypr.get_workspace(id) ?? Hyprland.Workspace.dummy(id, null);

  return Variable(get())
    .observe(hypr, "workspace-added", get)
    .observe(hypr, "workspace-removed", get);
}

export function WorkspaceIndicator(props: WorkspaceProps) {
  const hypr = Hyprland.get_default();
  const workspace = observeWorkspace(props.id);
  const { urgent, destroyUrgencyHandlers } = isUrgent(workspace);

  const stateClassNames = Variable.derive(
    [urgent, bind(hypr, "focused_workspace"), bind(hypr, "clients"), workspace],
    (urgent, focused, clients, workspace) => `
      indicator
      ${urgent ? "urgent" : ""}
      ${focused === workspace ? "focused" : ""}
      ${(clients?.filter((c) => c.workspace == workspace)?.length ?? 0 > 0) ? "occupied" : "empty"}
    `,
  );

  const handleDestroy = () => {
    workspace.drop();
    stateClassNames.drop();
    destroyUrgencyHandlers();
  };

  return (
    <button
      cursor="pointer"
      hexpand
      className={stateClassNames()}
      onDestroy={handleDestroy}
      onClick={() => workspace.get().focus()}
    />
  );
}
