let
  workspaces = builtins.concatLists (builtins.genList (
      x: let
        ws = let
          c = (x + 1) / 10;
        in
          builtins.toString (x + 1 - (c * 10));
      in [
        "$mod, ${ws}, workspace, ${toString (x + 1)}"
        "$mod SHIFT, ${ws}, movetoworkspace, ${toString (x + 1)}"
        "$mod SHIFT CTRL, ${ws}, movetoworkspacesilent, ${toString (x + 1)}"
      ]
    )
    10);
in {
  wayland.windowManager.hyprland.settings = {
    bindm = [
      # Mouse Movements
      "$mod, mouse:273, resizewindow"
      "$mod, mouse:272, movewindow"
    ];

    bind = let
      resize = "256";
    in [
      # Compositor Commands
      "$mod, Q, killactive,"
      "$mod, End, exit,"
      "$mod, F, fullscreen,"
      "$mod SHIFT, F, fullscreenstate, -1, 2"
      "ALT, TAB, hyprexpo:expo, toggle"
      "$mod CTRL, P, exec, hyprctl dispatch dpms on"

      # Groups
      "$mod, G, togglegroup,"
      "$mod SHIFT, N, changegroupactive, f"
      "$mod SHIFT, P, changegroupactive, b"

      # Floating Commands
      "$mod, mouse:276, pin,"
      "$mod, mouse:277, togglefloating,"
      "$mod, Space, cyclenext, floating"
      "$mod SHIFT, Space, togglefloating"

      # Move Windows
      "$mod, H, movefocus, l"
      "$mod, L, movefocus, r"
      "$mod, K, movefocus, u"
      "$mod, J, movefocus, d"

      # Resize Windows
      "$mod CTRL, H, resizeactive, -${resize}, 0"
      "$mod CTRL, L, resizeactive, ${resize}, 0"
      "$mod CTRL, K, resizeactive, 0, -${resize}"
      "$mod CTRL, J, resizeactive, 0, ${resize}"

      # Cycle Workspaces
      "$mod, backslash, workspace, previous_per_monitor"
      "$mod, bracketright, workspace, m+1"
      "$mod, bracketleft, workspace, m-1"
      "$mod, mouse_down, workspace, m+1"
      "$mod, mouse_up, workspace, m-1"
    ] ++ workspaces;
  };
}
