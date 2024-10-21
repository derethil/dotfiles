{ pkgs, lib, ... }:
let
  colors = {
    dark = {
      foreground = "d4be98";
      background = "1d2021";

      selection-foreground = "3c3836";
      selection-background = "d4be98";

      regular0 = "1d2021";
      regular1 = "ea6962";
      regular2 = "a9b665";
      regular3 = "d8a657";
      regular4 = "7daea3";
      regular5 = "d3869b";
      regular6 = "89b482";
      regular7 = "d4be98";

      bright0  = "eddeb5";
      bright1  = "ea6962";
      bright2  = "a9b665";
      bright3  = "d8a657";
      bright4  = "7daea3";
      bright5  = "d3869b";
      bright6  = "89b482";
      bright7  = "d4be98";
    };
  };
in {
  programs.foot = {
    enable = true;
    settings = {
      main = {
        font = "GeistMono NF SemiBold:size=12";
        horizontal-letter-offset = 0;
        vertical-letter-offset = 0;
        pad = "6x6 center";
        selection-target = "both";
      };

      desktop-notifications = {
        inhibit-when-focused = "no";
        command = "${lib.getExe pkgs.libnotify} -a \${app-id} -i \${app-id} \${title} \${body}";
      };

      mouse = {
        hide-when-typing = "yes";
      };

      url = {
        launch = "${pkgs.xdg-utils}/bin/xdg-open \${url}";
        protocols = "http, https, ftp, ftps, file, mailto, ipfs";
      };

      colors = lib.mkMerge [{ alpha = 0.86; } colors.dark];
    };
  };
}


