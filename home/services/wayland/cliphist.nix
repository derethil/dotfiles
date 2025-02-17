{pkgs, ...}: {
  services.cliphist = {
    enable = true;
    package = pkgs.cliphist;
    allowImages = true;
    systemdTargets = "hyprland-session.target";
  };
}
