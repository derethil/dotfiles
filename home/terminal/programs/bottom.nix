{ ... }: {
  programs.bottom = {
    enable = true;
    settings = {
      flags = {
        disable_gpu = false;
      };
      styles = {
        theme = "gruvbox";
      };
    };
  };
}
