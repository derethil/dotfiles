{
  imports = [
    ./terminal
    ./programs
    ./editors/neovim
  ];

  home = {
    username = "derethil";
    homeDirectory = "/home/derethil";
    stateVersion = "24.05";
  };

  programs.home-manager.enable = true;

  programs.ripgrep.enable = true;

  systemd.user.startServices = "sd-switch";
}
