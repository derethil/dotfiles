{pkgs, ...}: {
  imports = [
    ./gdlauncher.nix
  ];

  home.packages = with pkgs; [
    gamescope
    winetricks
  ];
}
