{config, ...}:
let
  pointer = config.home.pointerCursor;
  cursorName = "Bibata-Modern-Ice-Hyprcursor";
in {
  wayland.windowManager.hyprland.settings = {
    "$mod" = "SUPER";

    exec-once = [
      "hyprctl setcursor ${cursorName} ${toString pointer.size}"
    ];

    general = {
      border_size = 3;
      gaps_out = 12;
      gaps_in = 6;
      "col.active_border" = "rgba(7FB4CAee) rgba(98BB9Cee) 45deg";
      "col.inactive_border" = "rgba(727169aa)";
      layout = "master";
      resize_on_border = true;
      allow_tearing = false;
      no_focus_fallback = true;
    };

    master = {
      orientation = "left";
      new_status = "slave";
      always_center_master = true;
      mfact = 0.5;
    };
    
    decoration = {
      rounding = 8;

      drop_shadow = true;
      shadow_range = 100;
      shadow_render_power = 4;
      shadow_offset = "0 15";
      shadow_scale = 0.97;
      "col.shadow" = "rgba(1a1a1aaf)";

      blur = {
        enabled = true;
        xray = true;

        contrast = 1.1;
        noise = 0.01;

        vibrancy = 0.2;
        vibrancy_darkness = 0.5;

        passes = 4;
        size = 7;

        popups = true;
        popups_ignorealpha = 0.2;
      };
    };

    animations = {
      enabled = true;

      bezier = [
        "overshot, 0.05, 0.9, 0.1, 1.15" 
        "easeInOutExpo, 0.87, 0, 0.13, 1"
      ];

      animation = [
        "windows, 1, 3.5, easeInOutExpo"
        "windowsIn, 1, 4, overshot"
        "fade, 1, 3.5, default"
        "fadeLayers, 1, 3.5, default"
        "workspaces, 1, 3.5, easeInOutExpo, slidevert"
        "specialWorkspace, 1, 3.5, default, slidefadevert -100%"
      ];
    };

    group = {
      groupbar = {
        font_size = 14;
        height = 8;
        gradients = false;
      };
    };

    input = {
      follow_mouse = 1;
      sensitivity = 0;

      touchpad = {
        disable_while_typing = true;
        natural_scroll = true;
        tap-and-drag = 1;
      };
    };

    gestures = {
      workspace_swipe = true;
      workspace_swipe_touch = true;
    };

    misc = {
      disable_autoreload = true;
      disable_hyprland_logo = true;

      font_family = "Geist Mono Bold";

      vrr = 1;

      enable_swallow = true;
      swallow_regex = "^(footclient|GDLauncher)$";

      focus_on_activate = true;
    };

    binds = {
      allow_workspace_cycles = true;
      scroll_event_delay = 0;
      workspace_back_and_forth = true;
    };

    render = {
      explicit_sync = 1;
      explicit_sync_kms = 0;
      direct_scanout = false;
    };

    xwayland.force_zero_scaling = true;
    debug.disable_logs = false;

    plugin = {
      hyprexpo = {
        columns = 3;
        gap_size = 8;
        bg_color = "rgba(000000cc)";
        workspace_method = "first 1";
        enable_gestures = true;
        gesture_distance = 300;
        gesture_positive = true;
      };

      xwaylandprimary = {
        display = "DP-1";
      };
    };
  };
}
