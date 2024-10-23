{pkgs, ... }:
{
  home.packages = with pkgs; [
    # Archive Tools
    zip
    unzip
    unrar

    # Notifications
    libnotify

    # Utils
    ncdu
    xorg.xeyes 
    fd
  ];

  programs = {
    eza.enable = true;
    ssh.enable = true;
  };
}
