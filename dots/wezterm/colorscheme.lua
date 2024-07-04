local wezterm = require("wezterm")

local base_theme = "Gruvbox Material (Gogh)"
local scheme = wezterm.get_builtin_color_schemes()[base_theme]

scheme.background = "#1D2021"

local function colorscheme(config)
	config.color_schemes = {
		["Gruvbox Material Hard"] = scheme,
	}

	config.color_scheme = "Gruvbox Material Hard"
end

return colorscheme
