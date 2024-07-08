import { icons } from "lib/icons";
import { Brightness } from "services/brightness";
import { Progress } from "./Progress";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import { Binding } from "types/service";

const Audio = await Service.import("audio");

const DELAY = 2500;

function OnScreenProgress(vertical: boolean) {
  const indicator = Widget.Icon({
    size: 42,
    vpack: "start",
  });

  const progress = Progress({
    vertical,
    width: vertical ? 42 : 300,
    height: vertical ? 300 : 42,
    child: indicator,
  });

  const revealer = Widget.Revealer({
    revealChild: false,
    transition: vertical ? "slide_left" : "slide_up",
    child: progress,
  });

  // Count allows for the OSD to remain visible if multiple OSDs are triggered
  let count = 0;

  function show(value: number, icon: string) {
    revealer.reveal_child = true;
    indicator.icon = icon;
    progress.setValue(value);
    count++;
    Utils.timeout(DELAY, () => {
      count--;

      if (count === 0) revealer.reveal_child = false;
    });
  }

  return revealer
    .hook(
      Brightness,
      () => show(Brightness.screen, icons.tools.backlight),
      "notify::screen",
    )
    .hook(
      Audio.speaker,
      () => {
        show(Audio.speaker.volume, icons.tools.speaker);
      },
      "notify::volume",
    );
}

function StreamMute(type: "microphone" | "speaker") {
  const icon = Widget.Icon({
    className: "microphone",
  });

  const revealer = Widget.Revealer({
    transition: "slide_up",
    child: icon,
  });

  let count = 0;
  let mute = Audio[type].stream?.is_muted ?? false;

  return revealer.hook(Audio[type], () =>
    Utils.idle(() => {
      if (mute !== Audio[type].stream?.is_muted) {
        mute = Audio[type].stream!.is_muted;
        icon.icon = icons.audio[type].levels[mute ? "muted" : "high"];
        revealer.reveal_child = true;
        count++;

        Utils.timeout(DELAY, () => {
          count--;
          if (count === 0) revealer.reveal_child = false;
        });
      }
    }));
}

const DisplayWidgets: (Gtk.Widget | Binding<any, any, Gtk.Widget>)[] = [
  options.osd.progress.vertical.bind().as(OnScreenProgress),
  StreamMute("microphone"),
  StreamMute("speaker"),
];

export function OnScreenDisplay(monitor: number) {
  return Widget.Window({
    monitor,
    name: `indicator-${monitor}`,
    className: "indicator",
    layer: "overlay",
    clickThrough: true,
    anchor: ["right", "left", "top", "bottom"],
    child: Widget.Box({
      css: "padding: 2px;",
      expand: true,
      child: Widget.Overlay({
        child: Widget.Box<any, any>({ expand: true }),
        overlays: DisplayWidgets.map((child) =>
          Widget.Box({
            hpack: options.osd.progress.pack.h.bind(),
            vpack: options.osd.progress.pack.v.bind(),
            child: child,
          })
        ),
      }),
    }),
  });
}
