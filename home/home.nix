{inputs, ...}: {
  imports = [
    ./terminal
    ./programs
    ./editors/neovim
    inputs.nix-index-db.hmModules.nix-index
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
