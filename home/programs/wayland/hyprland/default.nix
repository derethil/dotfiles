{ inputs, pkgs, ... }:
let
  cursor = "Bibata-Modern-Ice-Hyprcursor";
  cursorPackage = inputs.self.packages.${pkgs.system}.bibata-hyprcursor;
in {
  imports = [
    ./binds.nix
    ./settings.nix
    ./rules.nix
  ];

  xdg.dataFile."icons/${cursor}".source = "${cursorPackage}/share/icons/${cursor}";
}
