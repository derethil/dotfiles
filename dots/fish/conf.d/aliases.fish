# Simple Aliases
alias la="eza -la --icons --group-directories-first"
alias btm="btm --enable_gpu_memory"
alias del="trash"
alias nv="nvim"
alias lg="lazygit"

# Temporary
function rm
    command echo "You're supposed to use `del` now!"
    command rm $argv
end
