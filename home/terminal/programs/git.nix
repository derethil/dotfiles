{pkgs, ...}: {
  home.packages = with pkgs; [git-open];

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

  programs.fish.shellAbbrs = {
    # Standard Git Commands
    gd = "git diff -M";
    ga = "git add";
    gf = "git fetch";
    gaa = "git add --all";
    gbd = "git branch -D";
    gbl = "git branch --list";
    gs = "git status";
    gca = "git commit --amend";
    gm = "git merge --no-ff";
    gpt = "git push --tags";
    gP = "git push";
    gp = "git pull";
    gpf = "git push --force-with-lease";
    grh = "git reset --hard";
    grs = "git reset --soft";
    gb = "git branch";
    gcob = "git checkout -b";
    gco = "git checkout";
    gba = "git branch -a";
    gcp = "git cherry-pick";
    gl = "git log --pretty=format:\"%Cgreen%h%Creset - %Cblue%an%Creset @ %ar : %s\"";
    gl2 = "git log --pretty='format:%Cgreen%h%Creset %an - %s' --graph";
    glv = "git log --stat";
    gpom = "git pull origin master";
    gcd = "cd \"`git rev-parse --show-toplevel`\"";
    gw = "git switch";
    gwc = "git switch -c";
    # Remove Untracked Files
    gcf = "git clean -fd";
    # Discard Working Changes
    gcod = "git checkout -- .";
    # Grab Latest Upstream
    gpum = "git pull upstream master";
    # Delete Branch Remotely
    gpod = "git push origin --delete";
    # Show Status Without Untracked Files
    gsu = "git status -uno";
    # Committing
    gcm = "git commit -m";
    gcv = "git commit --verbose";
    gcn = "git commit --amend --no-edit";
    gc = "git commit";
    # Diff in Neovim
    gdn = "git diff | nvim -";
    # Remove Staged Files
    grm = "git reset HEAD";
    # Add Current Files and Commit
    gacv = "git add . --all; git commit --verbose";
    # List Git Tags by Date
    gtd = "git log --tags --simplify-by-decoration --pretty=\"format:%ai %d\"";
    # List Repository Stats
    grl = "git shortlog -s -n --all --no-merges";
    # Open Current Branch in Browser
    gop = "git open";
  };
}
