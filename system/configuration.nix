{
  imports = [
    ./hardware-configuration.nix
    ./hardware
    ./programs
    ./core
    ./network
    ./nix
  ];

  # State Version
  system.stateVersion = "24.05";
}
