
set -x XDG_CONFIG_HOME $HOME/.config
set -x XDG_CACHE_HOME $HOME/.cache
set -x XDG_DATA_HOME $HOME/.local/share
set -x XDG_STATE_HOME $HOME/.local/state
set -x XDG_RUNTIME_DIR /run/user/1000

# XDG Directory Specification

# ASDF
set -x ASDF_CONFIG_FILE "$XDG_CONFIG_HOME"/asdf/asdfrc
set -x ASDF_DATA_DIR "$XDG_DATA_HOME"/asdf

# AWS CLI
set -x AWS_SHARED_CREDENTIALS_FILE "$XDG_CONFIG_HOME"/aws/credentials
set -x AWS_CONFIG_FILE "$XDG_CONFIG_HOME"/aws/config

# Bun
set -x BUN_INSTALL "$XDG_DATA_HOME"/bun

# Cargo / Rust
set -x CARGO_HOME "$XDG_DATA_HOME"/cargo
set -x RUSTUP_HOME "$XDG_DATA_HOME"/rustup

# Cuda
set -x CUDA_CACHE_PATH "$XDG_CACHE_HOME"/nv

# Docker
set -x DOCKER_CONFIG "$XDG_CONFIG_HOME"/docker

# Dotnet
set -x DOTNET_CLI_HOME "$XDG_DATA_HOME"/dotnet

# GnuPG
# set -x GNUPGHOME "$XDG_DATA_HOME"/gnup

# Go
set -x GOPATH "$XDG_DATA_HOME"/go
set -x GOMODCACHE "$XDG_CACHE_HOME"/go/mod

# Gradle / Java
set -x GRADLE_USER "$XDG_DATA_HOME"/gradle
set -x __JAVA_OPTIONS "-Djava.util.prefs.userRoot $XDG_CONFIG_HOME/java"
set -x JAVA_HOME /usr/lib/jvm/default

# Gtk-2
set -x GTK2_RC_FILES "$XDG_CONFIG_HOME"/gtk-2.0/gtkrc

# Histfile
set -x HISTFILE "$XDG_DATA_HOME"/bash/history

# NPM / PNPM
set -x NPM_CONFIG_USERCONFIG "$XDG_CONFIG_HOME"/npm/npmrc
set -x PNPM_HOME "$XDG_DATA_HOME"/pnpm

# NuGet
set -x NUGET_PACKAGES "$XDG_CACHE_HOME"/NuGetPackages

# Password Store
set -x PASSWORD_STORE_DIR "$XDG_DATA_HOME"/pass

# Python / Pip
set -x PYTHON_HISTORY "$XDG_DATA_HOME"/python/history

# Wine
set -x WINEPREFIX "$XDG_DATA_HOME"/wine
