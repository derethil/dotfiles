{ inputs, nixpkgs, config, ... }:
{
  # Enable OpenGL
  hardware.graphics.enable = true;

  # Load Nvidia Driver for Xorg and Wayland
  services.xserver.videoDrivers = ["nvidia"];

  hardware.nvidia = {
    modesetting.enable = true;
    powerManagement.enable = true;
    powerManagement.finegrained = false;

    open = true;
    nvidiaSettings = true;
    package = config.boot.kernelPackages.nvidiaPackages.stable;

    prime = {
      intelBusId = "PCI:1:0:0";
      nvidiaBusId = "PCI:0:2:0";
    };
  };
}
