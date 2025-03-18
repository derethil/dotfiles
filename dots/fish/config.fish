# Modify PATH
fish_add_path ~/.local/bin
fish_add_path $CARGO_HOME/bin
fish_add_path $GOPATH/bin
fish_add_path $PNPM_HOME
fish_add_path (ruby -e 'puts Gem.user_dir')/bin

# Tool Sources
source $ASDF_DATA_DIR/asdf.fish
direnv hook fish | source
thefuck --alias | source
starship init fish | source
zoxide init fish | source
uv generate-shell-completion fish | source
uvx --generate-shell-completion fish | source
source "$XDG_CONFIG_HOME/fish/plugins/babel.fish"

# Sudo Aliases
fish_load_sudo_alias

# Modify PATH
fish_add_path ~/.local/bin
fish_add_path $CARGO_HOME/bin
fish_add_path $GOPATH/bin
fish_add_path $PNPM_HOME
fish_add_path (ruby -e 'puts Gem.user_dir')/bin
