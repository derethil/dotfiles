import GLib from "gi://GLib";
import { SearchMenu } from "./SearchMenu";

const UserInfo = () =>
  Widget.Box({
    hpack: "start",
    class_name: "user-info",
    children: [
      Widget.Label({ label: options.user.bind() }),
      Widget.Label({ label: "@", class_name: "separator" }),
      Widget.Label(GLib.get_host_name()),
    ],
  });

export function Header() {
  return Widget.Box({
    class_name: "header",
    hpack: "fill",
    children: [UserInfo(), SearchMenu()],
  });
}
