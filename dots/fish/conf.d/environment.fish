
set -Ux XDG_CONFIG_HOME $HOME/.config
set -Ux XDG_CACHE_HOME $HOME/.cache
set -Ux XDG_DATA_HOME $HOME/.local/share
set -Ux XDG_STATE_HOME $HOME/.local/state
set -Ux XDG_RUNTIME_DIR /run/user/1000

# XDG Directory Specification

# ASDF
set -Ux ASDF_CONFIG_FILE "$XDG_CONFIG_HOME"/asdf/asdfrc
set -Ux ASDF_DATA_DIR "$XDG_DATA_HOME"/asdf

# AWS CLI
set -Ux AWS_SHARED_CREDENTIALS_FILE "$XDG_CONFIG_HOME"/aws/credentials
set -Ux AWS_CONFIG_FILE "$XDG_CONFIG_HOME"/aws/config

# Bun
set -Ux BUN_INSTALL "$XDG_DATA_HOME"/bun

# Cargo / Rust
set -Ux CARGO_HOME "$XDG_DATA_HOME"/cargo
set -Ux RUSTUP_HOME "$XDG_DATA_HOME"/rustup

# Cuda
set -Ux CUDA_CACHE_PATH "$XDG_CACHE_HOME"/nv

# Docker
set -Ux DOCKER_CONFIG "$XDG_CONFIG_HOME"/docker

# Dotnet
set -Ux DOTNET_CLI_HOME "$XDG_DATA_HOME"/dotnet

# GnuPG
# set -Ux GNUPGHOME "$XDG_DATA_HOME"/gnup

# Go
set -Ux GOPATH "$XDG_DATA_HOME"/go
set -Ux GOMODCACHE "$XDG_CACHE_HOME"/go/mod

# Gradle / Java
set -Ux GRADLE_USER "$XDG_DATA_HOME"/gradle
set -Ux __JAVA_OPTIONS "-Djava.util.prefs.userRoot $XDG_CONFIG_HOME/java"
set -Ux JAVA_HOME /usr/lib/jvm/default

# Gtk-2
set -Ux GTK2_RC_FILES "$XDG_CONFIG_HOME"/gtk-2.0/gtkrc

# Histfile
set -Ux HISTFILE "$XDG_DATA_HOME"/bash/history

# NPM / PNPM
set -Ux NPM_CONFIG_USERCONFIG "$XDG_CONFIG_HOME"/npm/npmrc
set -Ux PNPM_HOME "$XDG_DATA_HOME"/pnpm

# NuGet
set -Ux NUGET_PACKAGES "$XDG_CACHE_HOME"/NuGetPackages

# Password Store
set -Ux PASSWORD_STORE_DIR "$XDG_DATA_HOME"/pass

# Python / Pip
set -Ux PYTHON_HISTORY "$XDG_DATA_HOME"/python/history
set -Ux RYE_HOME "$XDG_DATA_HOME"/rye

# Wine
set -Ux WINEPREFIX "$XDG_DATA_HOME"/wine
