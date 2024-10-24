{
  imports = [
    ./hardware-configuration.nix
    ./hardware/graphics.nix
    ./programs
    ./core
    ./network
    ./nix
  ];

  # State Version
  system.stateVersion = "24.05";
}
