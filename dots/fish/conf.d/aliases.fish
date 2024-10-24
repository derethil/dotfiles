# Simple Aliases
alias ls="eza -la --icons --group-directories-first"
alias lt="eza --tree --icons --group-directories-first --level=3"
alias cat="bat"
alias btm="btm --enable_gpu"
alias del="trashy put"
alias nv="nvim"

alias udb="sudo updatedb"

function rm
    command rm $argv
end

function activate
    source ./.venv/bin/activate.fish
end

function refish
    source ~/.config/fish/config.fish
end

alias wget="wget --hsts-file=$XDG_DATA_HOME/wget-hsts"
