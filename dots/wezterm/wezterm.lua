local wezterm = require('wezterm')
local config = wezterm.config_builder()

-- Appearance Configuration
config.hide_tab_bar_if_only_one_tab = true
config.color_scheme = "Gruvbox Material (Gogh)"
config.window_background_opacity = 0.75

-- Font Configuration
config.font = wezterm.font("Geist Mono Semibold")
config.font_size = 12
config.bold_brightens_ansi_colors = true

-- Wayland crashes on Hyprland right now
config.enable_wayland = false

return config
