
set -Ux XDG_CONFIG_HOME $HOME/.config
set -Ux XDG_CACHE_HOME $HOME/.cache
set -Ux XDG_DATA_HOME $HOME/.local/share
set -Ux XDG_STATE_HOME $HOME/.local/state
set -Ux XDG_RUNTIME_DIR /run/user/1000

set -Ux ASDF_CONFIG_FILE $XDG_CONFIG_HOME/asdf/asdfrc
set -Ux ASDF_DATA_DIR $XDG_DATA_HOME/asdf
set -Ux BUN_INSTALL $XDG_DATA_HOME/bun
set -Ux CARGO_HOME $XDG_DATA_HOME/cargo
set -Ux DOCKER_CONFIG "$XDG_CONFIG_HOME"/docker
set -Ux GRADLE_USER $XDG_DATA_HOME/gradle
set -Ux __JAVA_OPTIONS "-Djava.util.prefs.userRoot $XDG_CONFIG_HOME/java"
set -Ux NPM_CONFIG_USERCONFIG $XDG_CONFIG_HOME/npm/npmrc
set -Ux PASSWORD_STORE_DIR "$XDG_DATA_HOME"/pass
set -Ux RUSTUP_HOME $XDG_DATA_HOME/rustup
set -Ux PYTHON_HISTORY $XDG_DATA_HOME/python/history
set -Ux PYENV_ROOT $XDG_DATA_HOME/pyenv
set -Ux RYE_HOME $XDG_DATA_HOME/rye
set -Ux GOPATH $XDG_DATA_HOME/go
set -Ux GOMODCACHE $XDG_CACHE_HOME/go/mod
set -Ux NUGET_PACKAGES "$XDG_CACHE_HOME"/NuGetPackages
set -Ux HISTFILE $XDG_DATA_HOME/bash/history
set -Ux GTK2_RC_FILES $XDG_CONFIG_HOME/gtk-2.0/gtkrc
set -Ux PNPM_HOME $XDG_DATA_HOME/pnpm
