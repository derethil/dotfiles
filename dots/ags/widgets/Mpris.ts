import { icons } from "../lib/icons";
import { blurImg } from "lib/utils";
import { FontIcon } from "./FontIcon";
import { MprisPlayer } from "types/service/mpris";
import { WindowProps } from "types/widgets/window";
import { LabelProps } from "types/widgets/label";
import { IconProps } from "types/widgets/icon";
import { SliderProps } from "types/widgets/slider";
import StackProps from "types/widgets/stack";
import Gtk from "gi://Gtk?version=3.0";

export const CoverArt = (
  player: MprisPlayer,
  props: WindowProps<any, any, any>
) =>
  Widget.Box({
    ...props,
    className: "cover",
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
    className: "blurred-cover",
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
    className: "title",
    label: player.bind("track_title"),
  });

export const ArtistLabel = (player: MprisPlayer, props: LabelProps = {}) =>
  Widget.Label({
    ...props,
    className: "artist",
    label: player.bind("track_artists").transform((a) => a.join(", ") || ""),
  });

export const PlayerIcon = (
  player: MprisPlayer,
  { symbolic = true, ...props }: IconProps & { symbolic?: boolean } = {}
) =>
  Widget.Icon({
    ...props,
    className: "player-icon",
    tooltipText: player.identity || "",
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
    className: "position-slider",
    drawValue: false,
    onChange: ({ value }) => (player.position = player.length * value),
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

interface PlayerButtonProps {
  player: MprisPlayer;
  children: StackProps<{ [name: string]: Gtk.Widget }, any>["children"];
  onClick: "shuffle" | "loop" | "playPause" | "previous" | "next";
  prop: string;
  canProp: string;
  cantValue: any;
}

const PlayerButton = ({
  player,
  children,
  onClick,
  prop,
  canProp,
  cantValue,
}: PlayerButtonProps) => {
  return Widget.Button({
    cursor: "pointer",
    child: Widget.Stack({ children }).bind(
      "shown",
      player,
      prop as any,
      (p) => `${p}`
    ),
    onClicked: () => player[onClick](),
    visible: player.bind(canProp as any).transform((c) => c !== cantValue),
  });
};

export const ShuffleButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    children: {
      true: FontIcon({
        className: "shuffle enabled",
        label: icons.mpris.shuffle.enabled,
      }),
      false: FontIcon({
        className: "shuffle disabled",
        label: icons.mpris.shuffle.disabled,
      }),
    },
    onClick: "shuffle",
    prop: "shuffle_status",
    canProp: "shuffle_status",
    cantValue: null,
  });

export const LoopButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    children: {
      None: FontIcon({
        className: "loop none",
        label: icons.mpris.loop.none,
      }),
      Track: FontIcon({
        className: "loop track",
        label: icons.mpris.loop.track,
      }),
      Playlist: FontIcon({
        className: "loop playlist",
        label: icons.mpris.loop.playlist,
      }),
    },
    onClick: "loop",
    prop: "loop_status",
    canProp: "loop_status",
    cantValue: null,
  });

export const PlayPauseButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    children: {
      Playing: FontIcon({
        className: "playing",
        label: icons.mpris.playing,
      }),
      Paused: FontIcon({
        className: "paused",
        label: icons.mpris.paused,
      }),
      Stopped: FontIcon({
        className: "stopped",
        label: icons.mpris.stopped,
      }),
    },
    onClick: "playPause",
    prop: "play_back_status",
    canProp: "can_play",
    cantValue: false,
  });

export const PreviousButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    children: {
      true: FontIcon({
        className: "previous",
        label: icons.mpris.prev,
      }),
    },
    onClick: "previous",
    prop: "can_go_prev",
    canProp: "can_go_prev",
    cantValue: false,
  });

export const NextButton = (player: MprisPlayer) =>
  PlayerButton({
    player,
    children: {
      true: FontIcon({
        className: "next",
        label: icons.mpris.next,
      }),
    },
    onClick: "next",
    prop: "can_go_next",
    canProp: "can_go_next",
    cantValue: false,
  });
