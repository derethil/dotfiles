{pkgs, ...}: {
  programs.fish = {
    enable = true;

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
