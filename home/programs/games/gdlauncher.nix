{
  inputs,
  pkgs,
  ...
}: {
  home.packages = [
    inputs.lemonake.packages.${pkgs.system}.gdlauncher-carbon
  ];
}
