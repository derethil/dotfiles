# My Dotfiles

This repository contains my personal dotfiles. They are managed using [Dotbot](https://github.com/anishathalye/dotbot).

## Installation

To install these dotfiles on a new system, follow these steps:

1. Clone this repository: `git clone https://github.com/jarenglenn/dotfiles.git`
2. Change to the cloned directory: `cd dotfiles`
3. Run the install script: `./install`, or `./install packages` to additionally install needed packages.

This will create the necessary symbolic links from this repository to the home directory (as well as install the needed packages if the `packages` argument was provided).

## Tooling

These dotfiles are designed around the following packages and tools:

- [Hyprland](https://github.com/hyprwm/Hyprland) (window manager)
- [Kitty](https://sw.kovidgoyal.net/kitty/) (terminal emulator)
- [Eww](https://github.com/elkowar/eww/) (widget library)
- [Fish](https://fishshell.com/) (shell)
- [Starship](https://starship.rs/) (prompt)
- [Asdf](https://asdf-vm.com/) (version manager)
- [Neovim](https://neovim.io/) (text editor)

## Dotbot

This dotfiles setup is managed using Dotbot and some additional Dotbot plugins:

- [Dotbot](https://github.com/anishathalye/dotbot) for managing dotfiles
- [Dotbot-yay](dotbot-yay/README.md) for managing packages
- [Dotbot-asdf](dotbot-asdf/README.md) for managing asdf plugins and versions

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
