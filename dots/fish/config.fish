# Removes fish greeting
set fish_greeting

# Sources
source ~/.asdf/asdf.fish
direnv hook fish | source
starship init fish | source
thefuck --alias | source
zoxide init fish | source

# Modifying the Path
fish_add_path ~/.local/bin/

# Load Sudo Alias
fish_load_sudo_alias
