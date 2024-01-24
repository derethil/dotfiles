# Simple Aliases
alias la="eza -la --icons"
alias kitty-reload="kill -SIGUSR1 (pgrep kitty)"
alias icat="kitty +kitten icat"
alias btm="btm --enable_gpu_memory"
alias del="trash"

# Local Keycloak Instance
alias keycloak="docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=password -p 8080:8080 jboss/keycloak:13.0.1"
alias nginx-proxy="docker run -d --name proxy -p 8000:8000 nginx:latest"

# Temporary
function rm
	command echo "You're supposed to use `del` now!"
	command rm $argv
end
