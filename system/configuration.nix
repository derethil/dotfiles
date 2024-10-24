{pkgs, ...}: {
  imports = [
    ./hardware-configuration.nix
    ./hardware/graphics.nix
    ./programs
    ./nix
  ];

  # Hostname
  networking.hostName = "nixos";

  # Systemd-Boot
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  boot.loader.systemd-boot.configurationLimit = 10;

  # Users
  users.users = {
    derethil = {
      shell = pkgs.fish;
      isNormalUser = true;
      extraGroups = ["wheel"];
    };
  };

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
