{pkgs, ...}: {
  imports = [
    ./zen.nix
  ];

  home.packages = with pkgs; [
    firefox
  ];
}
