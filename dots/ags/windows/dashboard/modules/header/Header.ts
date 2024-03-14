import GLib from "gi://GLib";
import { SearchMenu } from "./SearchMenu";

const Avatar = () =>
  Widget.Box({
    class_name: "avatar",
    css: options.dashboard.avatar.bind().as(
      (img) => `
        min-width: 50px;
        min-height: 50px;
        background-image: url('${img}');
        background-size: cover;
      `,
    ),
  });

const UserInfo = () =>
  Widget.Box({
    hpack: "start",
    class_name: "user-info",
    children: [
      Widget.Label(Utils.USER),
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
