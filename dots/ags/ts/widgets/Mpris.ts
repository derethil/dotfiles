import Widget from "resource:///com/github/Aylur/ags/widget.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import icons from "../icons.js";
import { blurImg } from "ts/lib/utils";
import FontIcon from "./FontIcon.js";
import { MprisPlayer } from "types/service/mpris.js";
import { WindowProps } from "types/widgets/window.js";
import { Props as LabelProps } from "types/widgets/label.js";
import { Props as IconProps } from "types/widgets/icon.js";
import { SliderProps } from "types/widgets/slider.js";
import StackProps from "types/widgets/stack.js";

export const CoverArt = (
  player: MprisPlayer,
  props: WindowProps<any, any, any>
) =>
  Widget.Box({
    ...props,
    class_name: "cover",
    css: player
      .bind("cover_path")
      .transform((p) => `background-image: url("${p}")`),
  });

export const BlurredCoverArt = (
  player: MprisPlayer,
  props: WindowProps<any, any, any>
) =>
  Widget.Box({
    ...props,
    class_name: "blurred-cover",
    setup: (self) =>
      self.hook(
        player,
        (box) =>
          blurImg(player.cover_path).then((img) => {
            img && box.setCss(`background-image: url("${img}")`);
          }),
        "notify::cover-path"
      ),
  });

export const TitleLabel = (player: MprisPlayer, props: LabelProps = {}) =>
  Widget.Label({
    ...props,
    class_name: "title",
    label: player.bind("track_title"),
  });

export const ArtistLabel = (player: MprisPlayer, props: LabelProps = {}) =>
  Widget.Label({
    ...props,
    class_name: "artist",
    label: player.bind("track_artists").transform((a) => a.join(", ") || ""),
  });

export const PlayerIcon = (
  player: MprisPlayer,
  { symbolic = true, ...props }: IconProps & { symbolic?: boolean } = {}
) =>
  Widget.Icon({
    ...props,
    class_name: "player-icon",
    tooltip_text: player.identity || "",
    setup: (self) =>
      self.hook(player, (icon) => {
        const name = `${player.entry}${symbolic ? "-symbolic" : ""}`;
        Utils.lookUpIcon(name)
          ? (icon.icon = name)
          : (icon.icon = icons.mpris.fallback);
      }),
  });

export const PositionSlider = (player: MprisPlayer, props: SliderProps = {}) =>
  Widget.Slider({
    ...props,
    class_name: "position-slider",
    draw_value: false,
    on_change: ({ value }) => (player.position = player.length * value),
    setup: (self) => {
      const update = () => {
        if (self.dragging) return;

        self.visible = player.length > 0;
        if (player.length > 0) self.value = player.position / player.length;
      };
      self.hook(player, update);
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

function lengthStr(length: number) {
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

export const PositionLabel = (player: MprisPlayer) =>
  Widget.Label<{ time: number }>({
    setup: (self) => {
      const update = (_: any, time: number) => {
        player.length > 0
          ? (self.label = lengthStr(time || player.position))
          : (self.visible = !!player);
      };
      self.hook(player, update, "position");
      self.poll(1000, update as any);
    },
  });

export const LengthLabel = (player: MprisPlayer) =>
  Widget.Label({
    label: player.bind("length").transform((l) => lengthStr(l)),
    visible: player.bind("length").transform((l) => l > 0),
  });

export const Slash = (player: MprisPlayer) =>
  Widget.Label({
    label: "/",
    visible: player.bind("length").transform((l) => l > 0),
  });

/**
 * @typedef {"name" | "length" | "bus_name" | "entry" | "identity" | "trackid" | "track_artists" | "track_title" | "track_cover_url" | "cover_path" | "play_back_status" | "can_go_next" | "can_go_prev" | "can_play" | "shuffle_status" | "loop_status" | "length" | "position" | "volume" } MprisPlayerProp
 */

/**
 * @param {Object} o
 * @param {import('types/service/mpris.js').MprisPlayer} o.player
 * @param {import('types/widgets/stack.js').StackProps['items']} o.items
 * @param {'shuffle' | 'loop' | 'playPause' | 'previous' | 'next'} o.onClick
 * @param {MprisPlayerProp} o.prop
 * @param {MprisPlayerProp} o.canProp
 * @param {any} o.cantValue
 */

interface PlayerButtonProps {
  player: MprisPlayer;
  items: StackProps<any, any>["items"];
  onClick: "shuffle" | "loop" | "playPause" | "previous" | "next";
  prop: string;
  canProp: string;
  cantValue: any;
}

const PlayerButton = ({
  player,
  items,
  onClick,
  prop,
  canProp,
  cantValue,
}: PlayerButtonProps) => {
  return Widget.Button({
    cursor: "pointer",
    child: Widget.Stack({ items }).bind(
      "shown",
      player,
      prop as any,
      (p) => `${p}`
    ),
    on_clicked: () => player[onClick](),
    visible: player.bind(canProp as any).transform((c) => c !== cantValue),
  });
};

export const ShuffleButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    items: [
      [
        "true",
        FontIcon({
          class_name: "shuffle enabled",
          icon: icons.mpris.shuffle.enabled,
        }),
      ],
      [
        "false",
        FontIcon({
          class_name: "shuffle disabled",
          icon: icons.mpris.shuffle.disabled,
        }),
      ],
    ],
    onClick: "shuffle",
    prop: "shuffle_status",
    canProp: "shuffle_status",
    cantValue: null,
  });

export const LoopButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    items: [
      [
        "None",
        FontIcon({
          class_name: "loop none",
          icon: icons.mpris.loop.none,
        }),
      ],
      [
        "Track",
        FontIcon({
          class_name: "loop track",
          icon: icons.mpris.loop.track,
        }),
      ],
      [
        "Playlist",
        FontIcon({
          class_name: "loop playlist",
          icon: icons.mpris.loop.playlist,
        }),
      ],
    ],
    onClick: "loop",
    prop: "loop_status",
    canProp: "loop_status",
    cantValue: null,
  });

export const PlayPauseButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    items: [
      [
        "Playing",
        FontIcon({
          class_name: "playing",
          icon: icons.mpris.playing,
        }),
      ],
      [
        "Paused",
        FontIcon({
          class_name: "paused",
          icon: icons.mpris.paused,
        }),
      ],
      [
        "Stopped",
        FontIcon({
          class_name: "stopped",
          icon: icons.mpris.stopped,
        }),
      ],
    ],
    onClick: "playPause",
    prop: "play_back_status",
    canProp: "can_play",
    cantValue: false,
  });

export const PreviousButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    items: [
      [
        "true",
        FontIcon({
          class_name: "previous",
          icon: icons.mpris.prev,
        }),
      ],
    ],
    onClick: "previous",
    prop: "can_go_prev",
    canProp: "can_go_prev",
    cantValue: false,
  });

export const NextButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    items: [
      [
        "true",
        FontIcon({
          class_name: "next",
          icon: icons.mpris.next,
        }),
      ],
    ],
    onClick: "next",
    prop: "can_go_next",
    canProp: "can_go_next",
    cantValue: false,
  });
