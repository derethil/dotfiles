{pkgs, ...}: {
  imports = [
    ./mpv.nix
  ];

  home.packages = with pkgs; [
    # Audio Control
    pulsemixer
    pwvucontrol
    # Audio
    spotify
    # Images
    loupe
    # Videos
    celluloid
    # Streaming 
    stremio
  ];
}
