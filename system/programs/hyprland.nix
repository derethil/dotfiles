{
  inputs,
  pkgs,
  ...
}: {
  # Enable Hyprland & Required Options
  programs.hyprland = {
    enable = true;

    package = inputs.hyprland.packages.${pkgs.system}.default;
    portalPackage = inputs.hyprland.packages.${pkgs.system}.xdg-desktop-portal-hyprland;
  };

  # Nvidia
  environment.variables.LIBVA_DRIVER_NAME = "nvidia";
  environment.variables.GBM_BACKEND = "nvidia-drm";
  environment.variables.__GLX_VENDOR_LIBRARY_NAME = "nvidia";
  environment.variables.NVD_BACKEND = "direct";

  # Hyprland Session Variables
  environment.variables.XDG_SESSION_TYPE = "Hyprland";
  environment.variables.XDG_CURRENT_DESKTOP = "Hyprland";

  # Force Electron/Chromium to use Wayland
  environment.variables.NIXOS_OZONE_WL = "1";
}
