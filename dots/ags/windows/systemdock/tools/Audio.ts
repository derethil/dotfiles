import { icons } from "lib/icons";
import { getSpeakerData, getVolumeIcon } from "lib/audio";
import { DockButton } from "../DockButton";

const AudioService = await Service.import("audio");

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
          icon: data?.icon ?? icons.audio.volume.high,
          tooltip: `Select ${data?.label ?? "Unknown"} Output`,
          handlePrimaryClick: () => AudioService.speaker = speaker,
        });
      })
    ),
  });
}

function SpeakerIndicator() {
  return Widget.Button({
    cursor: "pointer",
    vpack: "center",
    onPrimaryClick: () => {
      AudioService.speaker.is_muted = !AudioService.speaker.is_muted;
    },
    tooltipText: AudioService.speaker.bind("volume").as((volume) =>
      `Volume: ${Math.floor(volume * 100)}%`
    ),
    child: Widget.Icon({
      size: 22,
      icon: getVolumeIcon(AudioService.speaker),
    }),
  });
}

function SpeakerVolume() {
  return Widget.Slider({
    drawValue: false,
    value: AudioService.speaker.bind("volume"),
    onChange: ({ value }) => AudioService.speaker.volume = value,
    className: AudioService.speaker.bind("is_muted").as((m) =>
      m ? "muted" : ""
    ),
    min: 0,
    max: 1,
    hexpand: true,
  });
}

export function Audio() {
  return Widget.Box({
    css: "min-width: 250px",
    className: "audio-dock tool",
    vertical: true,
    children: [
      SpeakerSelector(),
      Widget.Separator({
        vertical: false,
      }),
      Widget.Box({
        hexpand: true,
        className: "speaker-controls",
        children: [
          SpeakerIndicator(),
          SpeakerVolume(),
        ],
      }),
    ],
  });
}
