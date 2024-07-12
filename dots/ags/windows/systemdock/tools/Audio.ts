import { Stream } from "types/service/audio";
import { icons } from "lib/icons";
import { getSpeakerData, getStreamIcon, StreamOptions } from "lib/audio";
import { DockButton } from "../DockButton";
import { toTitleCase } from "lib/utils";

const AudioService = await Service.import("audio");

function SelectSpeakerButton(speaker: Stream) {
  const data = getSpeakerData(speaker);

  const handleChangeSpeaker = () => {
    AudioService.speaker = speaker;
    Utils.notify({
      iconName: getSpeakerData(speaker)?.icon,
      summary: "Audio Output Changed",
      body: data?.label ?? "Unknown",
      timeout: 5000,
    });
  };

  return DockButton({
    icon: data?.icon ?? icons.tools.speaker,
    tooltip: `Select ${data?.label ?? "Unknown"} Output`,
    handlePrimaryClick: handleChangeSpeaker,
  });
}

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
    children: speakers.as((speakers) => speakers.map(SelectSpeakerButton)),
  });
}

function StreamIndicator(options: StreamOptions) {
  const { stream, type } = options;

  const getTooltip = () =>
    stream.bind("volume").as((volume) => {
      const label = type === "app"
        ? toTitleCase(stream.name ?? "Volume")
        : "Volume";

      return `${label}: ${Math.floor(volume * 100)}%`;
    });

  return Widget.Button({
    cursor: "pointer",
    vpack: "center",
    onPrimaryClick: () => stream.is_muted = !stream.is_muted,
    tooltipText: getTooltip(),
    child: Widget.Icon({
      size: 22,
      icon: getStreamIcon(options),
    }),
  });
}

function StreamVolume({ stream }: StreamOptions) {
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

function StreamControls(options: StreamOptions) {
  return Widget.Box({
    className: "stream-controls",
    children: [
      StreamIndicator(options),
      StreamVolume(options),
    ],
  });
}

function StreamMixer() {
  const ShownAppStreams = Utils.merge(
    [
      AudioService.bind("apps"),
      options.docks.hideAppMixerList.bind(),
    ],
    (streams, shouldHide) => {
      return streams.filter((stream) => {
        if (shouldHide.length === 0) return true;
        for (const regex of shouldHide) {
          return !regex.test(stream.name ?? "");
        }
      });
    },
  );
  return Widget.Box({
    vertical: true,
    className: "app-controls",
    children: ShownAppStreams.as((apps) =>
      apps.map((app) =>
        StreamControls({
          stream: app,
          type: "app",
        })
      )
    ),
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
          StreamControls({
            stream: AudioService.speaker,
            type: "speaker",
          }),
          StreamControls({
            stream: AudioService.microphone,
            type: "microphone",
          }),
        ],
      }),
      Widget.Separator({
        vertical: false,
      }),
      StreamMixer(),
    ],
  });
}
