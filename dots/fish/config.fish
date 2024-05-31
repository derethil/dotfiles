# Tool Sources
source $ASDF_DATA_DIR/asdf.fish
direnv hook fish | source
starship init fish | source
thefuck --alias | source
zoxide init fish | source

# Sudo Aliases
fish_load_sudo_alias

# Modify PATH
fish_add_path ~/.local/bin
fish_add_path $CARGO_HOME/bin
fish_add_path $RYE_HOME/bin
fish_add_path $RYE_HOME/shims
fish_add_path $GOPATH/bin
fish_add_path $PNPM_HOME

# Start Tmux
if status is-interactive; and not set -q TMUX
    tmux attach || tmux
end
