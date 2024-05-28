# Simple Aliases
alias ls="eza -la --icons --group-directories-first"
alias cat="bat"
alias btm="btm --enable_gpu_memory"
alias del="trashy put"
alias nv="nvim"
alias lg="lazygit"

function rm
    command echo "You're supposed to use `del` now!"
    command rm $argv
end

function activate
    source ./.venv/bin/activate.fish
end

function refish
    source ~/.config/fish/config.fish
end
