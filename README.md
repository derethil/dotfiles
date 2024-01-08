# My Dotfiles

This repository contains my personal dotfiles.

## Installation

To install these dotfiles on a new system, follow these steps:

1. Clone this repository: `git clone https://github.com/jarenglenn/dotfiles.git`
2. Change to the cloned directory: `cd dotfiles`
3. Run the install script: `./install`, or `./install packages` to additionally install needed packages.

This will create the necessary symbolic links from this repository to the home directory (as well as install the needed packages if the `packages` argument was provided).

## Tooling

These dotfiles are designed around the following packages and tools:

- **Window Manager**: [Hyprland](https://github.com/hyprwm/Hyprland)
- **Terminal**: [Kitty](https://sw.kovidgoyal.net/kitty/)
- **Shell**: [Fish](https://fishshell.com/)
- **Prompt**: [Starship](https://starship.rs/)
- **Widgets**: [Aylur's Gtk Shell](https://github.com/Aylur/ags)
- **Language Version Manager**: [Asdf](https://asdf-vm.com/)
- **Text Editor**: [Neovim](https://neovim.io/)
- **Font**: [San Francisco](https://developer.apple.com/fonts/)

## Dotbot

This dotfiles setup is managed using Dotbot and some additional Dotbot plugins:

- [Dotbot](https://github.com/anishathalye/dotbot) for managing dotfiles
- [Dotbot-yay](https://github.com/sobolevn/dotbot-asdf) for managing packages
- [Dotbot-asdf](https://github.com/OxSon/dotbot-yay/) for managing asdf plugins and versions
