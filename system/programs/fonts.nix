{pkgs, ...}: {
  fonts = {
    packages = with pkgs; [
      # Icon Fonts
      material-symbols

      # Sans(Serif) Fonts
      noto-fonts
      noto-fonts-emoji
      (google-fonts.override {fonts = ["Inter"];})

      # Monospace Fonts
      geist-font

      # Nerd Fonts
      (nerdfonts.override {fonts = ["NerdFontsSymbolsOnly"];})
    ];

    enableDefaultPackages = false;

    fontconfig.defaultFonts = let
      addAll = builtins.mapAttrs (_: v: ["Symbols Nerd Font"] ++ v ++ ["Noto Color Emoji"]);
    in
      addAll {
        serif = ["Noto Serif"];
        sansSerif = ["Inter"];
        monospace = ["Geist Mono"];
        emoji = [];
      };
  };
}
