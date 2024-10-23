{ inputs, pkgs, config, ... }:
let
  cursor = config.home.pointerCursor.name;
  cursorPackage = config.home.pointerCursor.package;
in {
  imports = [
    ./binds.nix
    ./settings.nix
    ./rules.nix
  ];

  xdg.dataFile."icons/${cursor}".source = "${cursorPackage}/share/icons/${cursor}";

  wayland.windowManager.hyprland = {
    enable = true;

    package = inputs.hyprland.packages.${pkgs.system}.default;

    plugins = with inputs.hyprland-plugins.packages.${pkgs.system}; [
      hyprexpo
    ];

    systemd = {
      variables = ["-all"];
      extraCommands = [
        "systemctl --user stop graphical-session.target"
	"systemctl --user start hyprland-session.target"
      ];
    };
  };
}
