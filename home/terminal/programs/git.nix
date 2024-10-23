{ config, pkgs, ... }: {
  home.packages = with pkgs; [ git-open ];

  programs.git = {
    enable = true;
    userName = "Jaren Glenn";
    userEmail = "jarenglenn@gmail.com";

    diff-so-fancy = {
      enable = true;
    };

    extraConfig = {
      core.editor = "nvim";
      push.autoSetupremote = true;
      merge.ff = false;
      pull.ff = "only";
    };

    ignores = [
      ".venv"
      ".tool-versions"
      ".envrc"
      ".local/"
      ".nvim.lua"
      ".vscode/"
      ".lazy.lua"
      "**/*.local"
      "*.local.*"
      ".direnv/"
      ".python-version"
    ];

    # signing = {
    #   key = "${config.home.homeDirectory}/.ssh/id_ed25519";
    #   signByDefault = true;
    # };
  };
}
