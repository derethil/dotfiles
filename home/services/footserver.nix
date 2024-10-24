{pkgs, ...}: {
  systemd.user.services.footserver = {
    Unit = {
      Description = "Foot Server";
      After = ["hyprland-session.target"];
      Requires = ["hyprland-session.target"];
    };
    Service = {
      ExecStart = "${pkgs.foot}/bin/foot --server";
      Restart = "always";
    };
    Install.WantedBy = ["hyprland-session.target"];
  };
}
