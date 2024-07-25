local wezterm = require("wezterm")

local function load_colorschemes(schemes)
	local config = {}
	for name, given in pairs(schemes) do
		if type(given) == "string" then
			local scheme = wezterm.color.load_scheme(given)
			config[name] = scheme
		else
			config[name] = given
		end
	end
	return config
end

local function colorscheme(config)
	config.color_scheme = "Gruvbox Material Dark Hard"
	config.color_schemes = load_colorschemes({
		Mellow = "/home/derethil/.config/wezterm/schemes/mellow.toml",
		["Gruvbox Material Dark Hard"] = {
			foreground = "#D4BE98",
			background = "#1D2021",
			cursor_bg = "#D4BE98",
			cursor_border = "#D4BE98",
			cursor_fg = "#1D2021",
			selection_bg = "#D4BE98",
			selection_fg = "#3C3836",
			ansi = { "#1d2021", "#ea6962", "#a9b665", "#d8a657", "#7daea3", "#d3869b", "#89b482", "#d4be98" },
			brights = { "#eddeb5", "#ea6962", "#a9b665", "#d8a657", "#7daea3", "#d3869b", "#89b482", "#d4be98" },
		},
	})
end

return colorscheme
