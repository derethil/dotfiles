let
  wallpaper = "~/Pictures/pixel-art-bar.png";
in {
  services.hyprpaper = {
    enable = true;
    settings = {
      ipc = "on";
      preload = [wallpaper];
      wallpaper = ["DP-5,${wallpaper}"];
    };
  };
}
