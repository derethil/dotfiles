import Widget from "resource:///com/github/Aylur/ags/widget.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";
import icons from "../icons.js";
import { blurImg } from "../utils.js";
import FontIcon from "./FontIcon.js";

/**
 * @param {import('types/service/mpris').MprisPlayer} player
 * @param {import('types/widgets/window').WindowProps} props
 */
export const CoverArt = (player, props) =>
  Widget.Box({
    ...props,
    class_name: "cover",
    css: player
      .bind("cover_path")
      .transform((p) => `background-image: url("${p}")`),
  });

/**
 * @param {import('types/service/mpris.js').MprisPlayer} player
 * @param {import('types/widgets/box.js').BoxProps=} props
 */
export const BlurredCoverArt = (player, props) =>
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

/**
 * @param {import('types/service/mpris.js').MprisPlayer} player
 * @param {import('types/widgets/label.js').Props=} props
 */
export const TitleLabel = (player, props) =>
  Widget.Label({
    ...props,
    class_name: "title",
    label: player.bind("track_title"),
  });

/**
 * @param {import('types/service/mpris.js').MprisPlayer} player
 * @param {import('types/widgets/label.js').Props=} props
 */
export const ArtistLabel = (player, props) =>
  Widget.Label({
    ...props,
    class_name: "artist",
    label: player.bind("track_artists").transform((a) => a.join(", ") || ""),
  });

/**
 * @param {import('types/service/mpris.js').MprisPlayer} player
 * @param {import('types/widgets/icon.js').Props & { symbolic?: boolean }=} props
 */
export const PlayerIcon = (player, { symbolic = true, ...props } = {}) =>
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

/**
 * @param {import('types/service/mpris.js').MprisPlayer} player
 * @param {import('types/widgets/slider.js').SliderProps=} props
 */
export const PositionSlider = (player, props) =>
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

/** @param {number} length */
function lengthStr(length) {
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const PositionLabel = (player) =>
  Widget.Label({
    setup: (self) => {
      const update = (_, time) => {
        player.length > 0
          ? (self.label = lengthStr(time || player.position))
          : (self.visible = !!player);
      };
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const LengthLabel = (player) =>
  Widget.Label({
    label: player.bind("length").transform((l) => lengthStr(l)),
    visible: player.bind("length").transform((l) => l > 0),
  });

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const Slash = (player) =>
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
const PlayerButton = ({ player, items, onClick, prop, canProp, cantValue }) => {
  return Widget.Button({
    cursor: "pointer",
    child: Widget.Stack({ items }).bind("shown", player, prop, (p) => `${p}`),
    on_clicked: () => player[onClick](),
    visible: player.bind(canProp).transform((c) => c !== cantValue),
  });
};

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const ShuffleButton = (player) =>
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

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const LoopButton = (player) =>
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

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const PlayPauseButton = (player) =>
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

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const PreviousButton = (player) =>
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

/** @param {import('types/service/mpris.js').MprisPlayer} player */
export const NextButton = (player) =>
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
