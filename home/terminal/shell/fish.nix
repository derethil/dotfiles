{pkgs, ...}: {
  home.packages = with pkgs; [
    terminaltexteffects
  ];

  programs.fish = {
    enable = true;

    interactiveShellInit = ''
        set fish_greeting # Disable default greeting
        set greeting "from zoya
        🌷🌸🌷🌸
        🌸🌷🌸🌷🌸
       /ᐠ🌷🌸🌷🌸🌷
      (˶ᵔᵕᵔ🌷🌸🌷
       \ つ\  /
        U U/🎀\\"
        echo $greeting | tte --no-color --frame-rate 300 beams
    '';

    shellAliases = {
      l = "eza -la --icons --group-directories-first";
      lt = "eza --tree --icons --group-directories-first";
      del = "trashy put";
      wget = "wget --hsts-file=$XDG_CACHE_HOME/wget-hsts";
    };

    plugins = with pkgs; [
      {
        name = "grc";
        src = fishPlugins.grc.src;
      }
      {
        name = "fzf";
        src = fishPlugins.fzf-fish;
      }
      {
        name = "done";
        src = fishPlugins.done;
      }
    ];
  };
}
