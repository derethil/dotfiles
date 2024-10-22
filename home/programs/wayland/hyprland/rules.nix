{
  wayland.windowManager.hyprland.settings = {
    windowrulev2 = [
      # Suppress Events
      "suppressevent maximize, class:.*"         
      "suppressevent activatefocus, class:Steam" 

      # Steam Flickering
      "stayfocused, title:^()$,class:^(steam)$"
      "minsize 1 1, title:^()$,class:^(steam)$"

      # Bitwarden Extension
      "float, title:^(.*Bitwarden Password Manager.*)$"

      # Make Firefox Picture-in-Picture Windows Float
      "float, title:^(Picture-in-Picture)$"
      "pin, title:^(Picture-in-Picture)$"

      # Hide Sharing Indicators
      "workspace special silent, title:^(Firefox — Sharing Indicator)$"
      "workspace special silent, title:^(Zen — Sharing Indicator)$"
      "workspace special silent, title:^(.*is sharing (your screen|a window)\.)$"

      # Games
      "tile,class:^(m|M)(inecraft.*)$"
      "fullscreen,class:^(m|M)(inecraft.*)$"
      "fullscreen,class:^(steam_app_[0-9]+)$"

      # Application Default Workspaces
      "workspace 1, title:Zen Browser"                     
      "workspace 1, class:code-url-handler"                
                                                        
      "workspace 2, class:discord"                         
      "workspace 2, class:Mattermost"                      
                                                        
      "workspace 3, class:Insomnia"                        
      "workspace 3, class:com.stremio.Stremio"
                                                        
      "workspace 4, class:^([Ss]team)$, title:^([Ss]team)$"
      "workspace 4, class:^(steam_app_[0-9]+)$"            
      "workspace 4, class:heroic"                          
      "workspace 4, class:GDLauncher"                      
      "workspace 4, class:^(m|M)(inecraft.*)$"             

      "workspace 5, title:.*Spotify.*"                     
    ];
  };
}
