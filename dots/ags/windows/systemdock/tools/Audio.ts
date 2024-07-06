import { icons } from "lib/icons";
import { getSpeakerData } from "lib/audio";
import { DockButton } from "../DockButton";

const AudioService = await Service.import("audio");

function StreamSelector() {
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

export function Audio() {
  return Widget.Box({
    css: "min-width: 250px",
    className: "audio-dock tool",
    vertical: true,
    children: [
      StreamSelector(),
    ],
  });
}
