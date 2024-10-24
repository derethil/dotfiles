{...}: {
  programs.bat = {
    enable = true;
    config = {
      pager = "less -FR";
      theme = "gruvbox-dark";
    };
  };

  home.sessionVariables = {
    MANPAGER = "sh -c 'col -bx | bat -l man -p";
    MANROFFOPT = "-c";
  };

  programs.fish.shellAliases = {
    cat = "bat";
  };
}
