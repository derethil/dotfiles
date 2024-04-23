import { Wallpaper as WallpaperService } from "services/wallpaper";

export const Wallpaper = () =>
  Widget.Box({
    className: "row wallpaper",
    children: [
      Widget.Box({
        vertical: true,
        children: [
          Widget.Label({
            xalign: 0,
            className: "row-title",
            label: "Wallpaper",
            vpack: "start",
          }),
          Widget.Button({
            onClicked: WallpaperService.random,
            label: "Random",
          }),
          Widget.FileChooserButton({
            onFileSet: ({ uri }) =>
              WallpaperService.set(uri!.replace("file://", "")),
          }),
        ],
      }),
      Widget.Box({ hexpand: true }),
      Widget.Box({
        className: "preview",
        css: WallpaperService.bind("wallpaper").as((wp) => `
            min-height: 120px;
            min-width: 280px;
            background-image: url('${wp}');
            background-size: cover;
        `),
      }),
    ],
  });
