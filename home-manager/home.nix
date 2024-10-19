{ inputs, lib, config, pkgs, ... }: 
{
  imports = [ ];

  home = {
    username = "derethil";
    homeDirectory = "/home/derethil";
  };

  programs.neovim.enable = true;

  programs.home-manager.enable = true;

  programs.git = {
    enable = true;
    userName = "Jaren Glenn";
    userEmail = "jarenglenn@gmail.com";
  };

  systemd.user.startServices = "sd-switch";

  home.stateVersion = "24.05";
}
