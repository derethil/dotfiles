import { icons } from "lib/icons";
import RegularWindow from "windows/RegularWindow";
import { Layout } from "./layout";

const current = Variable(Layout[0].attribute.title);

const Header = () =>
  Widget.CenterBox({
    className: "header",
    startWidget: Widget.Button({
      className: "reset",
      onClicked: options.reset,
      hpack: "start",
      vpack: "start",
      child: Widget.Icon(icons.ui.refresh),
      tooltipText: "Reset",
    }),
    centerWidget: Widget.Box({
      className: "pager horizontal",
      children: Layout.map(({ attribute: { title, icon } }) =>
        Widget.Button({
          xalign: 0,
          className: current.bind().as((v) => `${v === title ? "active" : ""}`),
          onClicked: () => current.value = title,
          child: Widget.Box([
            Widget.Icon(icon),
            Widget.Label(title),
          ]),
        })
      ),
    }),
  });

const PagesStack = () =>
  Widget.Stack({
    transition: "slide_left_right",
    children: Layout.reduce(
      (obj, page) => ({ ...obj, [page.attribute.title]: page }),
      {},
    ),
    shown: current.bind() as never,
  });

export const Settings = () => {
  return RegularWindow({
    name: "settings",
    className: "settings-dialog",
    title: "Settings",
    setup(win) {
      win.on("delete-event", () => {
        win.hide();
        return true;
      });
      win.set_default_size(500, 600);
    },
    child: Widget.Box({
      vertical: true,
      children: [
        Header(),
        PagesStack(),
      ],
    }),
  });
};
