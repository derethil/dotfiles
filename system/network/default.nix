{
  imports = [
    ./spotify.nix
    ./avahi.nix
  ];

  networking = {
    # use quad9 with DNS over TLS
    nameservers = ["9.9.9.9#dns.quad9.net"];

    networkmanager = {
      enable = true;
      dns = "systemd-resolved";
      wifi.powersave = true;
    };
  };

  services = {
    openssh = {
      enable = true;
      settings = {
        PermitRootLogin = "yes";
        PasswordAuthentication = false;
        UseDns = true;
      };
    };

    resolved = {
      enable = true;
      dnsovertls = "opportunistic";
    };
  };
}
