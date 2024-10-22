{ inputs, pkgs, ... }: 

{
  # Enable Hyprland & Required Options
  programs.hyprland = {
    enable = true;

    package = inputs.hyprland.packages.${pkgs.system}.default;
    portalPackage = inputs.hyprland.packages.${pkgs.system}.xdg-desktop-portal-hyprland;
  };

  # Nvidia 
  environment.variables.LIBVA_DRIVER_NAME = "nvidia";
  environment.variables.XDG_SESSION_TYPE = "wayland";
  environment.variables.GBM_BACKEND = "nvidia-drm";
  environment.variables.__GLX_VENDOR_LIBRARY_NAME = "nvidia";
  environment.variables.NVD_BACKEND = "direct";

  # Force Electron/Chromium to use Wayland
  environment.variables.NIXOS_OZONE_WL = "1";
}
