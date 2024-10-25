{
  pkgs,
  config,
  ...
}: let
  createNvimLink = path: config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.nix/home/editors/neovim/${path}";
in {
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
      stylua
      # Language Servers
      gopls
      svelte-language-server
      yaml-language-server
      lua-language-server
      nil
      # Misc
      gotools
      go
      nodejs_22 # Required for Copilot
    ];

    extraLuaConfig = ''
      -- bootstrap lazy.nvim, LazyVim and your plugins
      require("config.lazy");
    '';
  };

  xdg.configFile."nvim/lazy-lock.json".source = createNvimLink "lazy-lock.json";
  xdg.configFile."nvim/lazyvim.json".source = createNvimLink "lazyvim.json";
  xdg.configFile."nvim/lua".source = createNvimLink "lua";
  # xdg.configFile."nvim/lua" = {
  #   source = ./lua;
  #   recursive = true;
  # };
}
