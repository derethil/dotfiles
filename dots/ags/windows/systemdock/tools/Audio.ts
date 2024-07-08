import { icons } from "lib/icons";
import { getMicrophoneIcon, getSpeakerData, getVolumeIcon } from "lib/audio";
import { DockButton } from "../DockButton";

const AudioService = await Service.import("audio");

type StreamType = "microphone" | "speaker";

function SpeakerSelector() {
  const speakers = Utils.merge(
    [
      AudioService.bind("speakers"),
      options.docks.hideSpeakerList.bind(),
    ],
    (speakers, shouldHide) => {
      return speakers.filter((speaker) => {
        if (shouldHide.length === 0) return true;
        for (const regex of shouldHide) {
          return !regex.test(speaker.name ?? "");
        }
      });
    },
  );

  return Widget.Box({
    className: "speaker-selector",
    hexpand: true,
    hpack: "center",
    children: speakers.as((speakers) =>
      speakers.map((speaker) => {
        const data = getSpeakerData(speaker);
        return DockButton({
          icon: data?.icon ?? icons.tools.speaker,
          tooltip: `Select ${data?.label ?? "Unknown"} Output`,
          handlePrimaryClick: () => {
            Utils.notify({
              iconName: getSpeakerData(speaker)?.icon,
              summary: "Audio Output Changed",
              body: data?.label ?? "Unknown",
              timeout: 5000,
            });
            AudioService.speaker = speaker;
          },
        });
      })
    ),
  });
}

function StreamIndicator(type: StreamType) {
  const stream = AudioService[type];
  return Widget.Button({
    cursor: "pointer",
    vpack: "center",
    onPrimaryClick: () => stream.is_muted = !stream.is_muted,
    tooltipText: stream.bind("volume").as((volume) =>
      `Volume: ${Math.floor(volume * 100)}%`
    ),
    child: Widget.Icon({
      size: 22,
      icon: type === "speaker"
        ? getVolumeIcon(stream)
        : getMicrophoneIcon(stream),
    }),
  });
}

function StreamVolume(type: StreamType) {
  const stream = AudioService[type];
  return Widget.Slider({
    drawValue: false,
    sensitive: stream.bind("is_muted").as((m) => !m),
    value: stream.bind("volume"),
    onChange: ({ value }) => stream.volume = value,
    className: stream.bind("is_muted").as((m) => m ? "muted" : ""),
    min: 0,
    max: 1,
    hexpand: true,
  });
}

function StreamControls(type: StreamType) {
  return Widget.Box({
    className: "stream-controls",
    children: [
      StreamIndicator(type),
      StreamVolume(type),
    ],
  });
}

export function Audio() {
  return Widget.Box({
    css: "min-width: 300px",
    className: "audio-dock tool",
    vertical: true,
    children: [
      SpeakerSelector(),
      Widget.Separator({
        vertical: false,
      }),
      Widget.Box({
        vertical: true,
        className: "main-audio-controls",
        children: [
          StreamControls("speaker"),
          StreamControls("microphone"),
        ],
      }),
    ],
  });
}
