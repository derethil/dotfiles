import { OverlayRevaler } from "widgets/OverlayRevealer";
import { PopupWindow } from "windows/PopupWindow";
import { Header } from "./modules/header/Header";

export const DashboardOverlay = OverlayRevaler({
  transition: "slide_down",
  passThrough: true,
  child: Widget.Box({
    css: "min-width: 800px; min-height: 500px;",
    vertical: true,
    vpack: "start",
    hexpand: true,
    children: [Header()],
  }),
});

export const Dashboard = () => {
  return PopupWindow({
    name: "dashboard",
    layout: "bottom-center",
    transition: "slide_up",
    child: DashboardOverlay,
  });
};
