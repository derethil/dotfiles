{pkgs, ...}: {
  users.users = {
    derethil = {
      shell = pkgs.fish;
      isNormalUser = true;
      extraGroups = ["wheel"];
    };
  };
}
