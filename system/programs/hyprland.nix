{ inputs, pkgs, ... }: 

{
  # Enable Hyprland & Required Options
  programs.hyprland = {
    enable = true;

    package = inputs.hyprland.packages.${pkgs.system}.default;
    portalPackage = inputs.hyprland.packages.${pkgs.system}.xdg-desktop-portal-hyprland;
  };

  # Force Electron/Chromium to use Wayland
  environment.variables.NIXOS_OZONE_WL = "1";
}
