{pkgs, ...}: {
  imports = [
    ./hyprland
    ./cliphist.nix
  ];

  home.packages = with pkgs; [
    wl-clipboard
    wlr-randr
  ];

  home.sessionVariables = {
    QT_QPA_PLATFORM = "wayland";
    SDL_VIDEODRIVER = "wayland";
    XDG_SESSION_TYPE = "wayland";
  };
}
