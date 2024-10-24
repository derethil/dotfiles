{pkgs, ...}: {
  home.packages = with pkgs; [
    # Archive Tools
    zip
    unzip
    unrar

    # Notifications
    libnotify

    # Utils
    ncdu
    tldr
    xorg.xeyes
    fd
  ];

  programs = {
    zoxide.enable = true;
    eza.enable = true;
    ssh.enable = true;
  };
}
