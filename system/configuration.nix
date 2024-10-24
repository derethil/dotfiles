{
  imports = [
    ./hardware-configuration.nix
    ./hardware/graphics.nix
    ./programs
    ./core
    ./nix
  ];

  # Hostname
  networking.hostName = "nixos";

  # SSH
  services.gnome.gnome-keyring.enable = true;
  services.openssh = {
    enable = true;
    settings = {
      PermitRootLogin = "yes";
      PasswordAuthentication = false;
      UseDns = true;
    };
  };

  # State Version
  system.stateVersion = "24.05";
}
