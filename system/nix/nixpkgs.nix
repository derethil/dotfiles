{
  nixpkgs = {
    config = {
      allowUnfree = true;
    };

    overlays = [
      (self: super: {utillinux = super.util-linux;})
    ];
  };
}
