import { icons } from "lib/icons";
import { Menu } from "../widgets/Menu";
import { FontIcon } from "widgets/FontIcon";
import { icon } from "lib/utils";
import { Stream } from "types/service/audio";

const Audio = await Service.import("audio");

const SinkItem = (stream: Stream) =>
  Widget.Button({
    hexpand: true,
    onClicked: () => (Audio.speaker = stream),
    child: Widget.Box({
      children: [
        Widget.Icon({
          icon: icon(stream.icon_name || "", icons.audio.type.headset),
          tooltipText: stream.icon_name || "",
        }),
        Widget.Label(
          (stream.description || "").split(" ").slice(0, 4).join(" ")
        ),
        Widget.Icon({
          icon: icons.ui.tick,
          hexpand: true,
          hpack: "end",
          visible: Audio.speaker.bind("stream").as((s) => s === stream.stream),
        }),
      ],
    }),
  });
export const SinkSelector = () =>
  Menu({
    name: "sink-selector",
    icon: FontIcon({ label: icons.audio.type.headset }),
    title: Widget.Label("Sink Selector"),
    content: [
      Widget.Box({
        vertical: true,
        children: Audio.bind("speakers").as((a) => a.map(SinkItem)),
      }),
      Widget.Separator(),
    ],
  });

export function AudioManager() {
  return Widget.Box({
    class_name: "audio-manager",
    children: [SinkSelector()],
  });
}
// Widget.Button({
//   className: "audio-manager",
//   child: SinkSelector(),
// child: Widget.Label({
//   label: Audio.bind("speaker").as((speaker) => speaker.description ?? ""),
// }),
// onPrimaryClick: (_, event) => {
//   return Widget.Menu({
//     children: Audio.speakers.map((speaker) =>
//       Widget.MenuItem({
//         child: Widget.Label(speaker.description ?? ""),
//         onActivate: () => {
//           Audio.speaker = speaker;
//         },
//       })
//     ),
//   }).popup_at_pointer(event);
// },
// });
