# Sources
source $ASDF_DATA_DIR/asdf.fish
direnv hook fish | source
starship init fish | source
thefuck --alias | source
zoxide init fish | source

# Load Sudo Alias
fish_load_sudo_alias
