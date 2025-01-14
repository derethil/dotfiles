import { bind } from "astal";
import AstalNotifd from "gi://AstalNotifd";
import { CircleButton } from "widgets/Bar/elements";

export function ToggleDoNotDisturb() {
  const notifd = AstalNotifd.get_default();

  const icon = bind(notifd, "dontDisturb").as((dontDisturb) => {
    if (dontDisturb) return "bell-off-symbolic";
    return "bell-symbolic";
  });

  const handleToggle = () => {
    notifd.dontDisturb = !notifd.dontDisturb;
  };

  return (
    <CircleButton onClick={handleToggle} className="dnd">
      <icon icon={icon} />
    </CircleButton>
  );
}
