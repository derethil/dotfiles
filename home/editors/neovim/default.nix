{pkgs, ...}: {
  programs.neovim = {
    enable = true;
    viAlias = true;
    vimAlias = true;

    withNodeJs = true;
    withPython3 = true;

    plugins = with pkgs.vimPlugins; [
      LazyVim
      nvim-lspconfig
    ];

    extraPackages = with pkgs; [
      # Dependencies
      fd
      gcc
      gnutar
      ripgrep
      zig
      # Formatters
      biome
      rustfmt
      rustywind
      prettierd
      alejandra
      eslint_d
      # Language Servers
      gopls
      svelte-language-server
      yaml-language-server
      lua-language-server
      nil
      # Misc
      gotools
      go
    ];

    extraLuaConfig = ''
      -- bootstrap lazy.nvim, LazyVim and your plugins
      require("config.lazy");
    '';
  };

  xdg.configFile."nvim/lua" = {
    source = ./lua;
    recursive = true;
  };
}
