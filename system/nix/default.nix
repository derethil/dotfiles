{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  imports = [
    ./nh.nix
    ./nixpkgs.nix
    ./substituters.nix
  ];

  programs.nix-ld.enable = true;
  services.envfs.enable = true;

  environment.systemPackages = [pkgs.git];

  nix = let
    flakeInputs = lib.filterAttrs (_: lib.isType "flake") inputs;
  in {
    registry = lib.mapAttrs (_: flake: {inherit flake;}) flakeInputs;

    nixPath = lib.mapAttrsToList (n: _: "${n}=flake:${n}") flakeInputs;

    settings = {
      auto-optimise-store = true;
      builders-use-substitutes = true;
      experimental-features = ["nix-command" "flakes"];
      flake-registry = "/etc/nix/registry.json";
      nix-path = config.nix.nixPath;
      trusted-users = ["root" "@wheel"];
    };
  };
}
