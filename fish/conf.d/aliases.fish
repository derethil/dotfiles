# Simple Aliases
alias la="eza -la --icons"
alias gotop="gotop --nvidia"
alias kitty-reload="kill -SIGUSR1 (pgrep kitty)"

# Local Keycloak Instance
alias keycloak="docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=password -p 8080:8080 jboss/keycloak:13.0.1"
