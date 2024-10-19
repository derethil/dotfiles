{ inputs, lib, config, pkgs, ... }:

{
  # Imports
  imports = [
    ./hardware-configuration.nix
    ./programs/hyprland.nix
    ./hardware/graphics.nix
  ];

  # Nixpkgs
  nixpkgs = {
    overlays = [];
    config = {
      allowUnfree = true;
    };
  };

  # Nix Settings
  nix = let
    flakeInputs = lib.filterAttrs (_: lib.isType "flake") inputs;
  in {
    settings = {
      experimental-features = "nix-command flakes";
      auto-optimise-store = true;
      flake-registry = "";
      nix-path = config.nix.nixPath;
    };
    gc = {
      automatic = true;
      dates = "weekly";
      options = "--delete-older-than 1w";
    };
    channel.enable = false;
    registry = lib.mapAttrs (_: flake: {inherit flake;}) flakeInputs;
    nixPath = lib.mapAttrsToList (n: _: "${n}=flake:${n}") flakeInputs;
  };

  # Hostname
  networking.hostName = "nixos";

  # Systemd-Boot
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  boot.loader.systemd-boot.configurationLimit = 10;

  # Users
  users.users = {
    derethil = {
      isNormalUser = true;
      openssh.authorizedKeys.keys = [];
      extraGroups = ["wheel"];
    };
  };

  # SSH
  services.openssh = {
    enable = true;
    settings = {
      PermitRootLogin = "no";
      PasswordAuthentication = false;
    };
  };

  # State Version
  system.stateVersion = "24.05";
}
