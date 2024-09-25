local function get_palette()
  local config = vim.fn["gruvbox_material#get_configuration"]()
  local palette = vim.fn["gruvbox_material#get_palette"](config.background, config.foreground, config.colors_override)
  return palette
end

local function customize_gruvbox()
  local palette = get_palette()
  local set_hl = vim.fn["gruvbox_material#highlight"]

  set_hl("MiniFilesNormal", palette.fg1, palette.none)
  set_hl("FloatBorder", palette.grey1, palette.none)
  set_hl("MiniFilesCursorLine", palette.none, palette.bg_diff_green, "bold")
  set_hl("NvimSeparator", palette.green, palette.none)
  set_hl("GitConflictCurrent", palette.none, palette.bg_diff_blue)
  set_hl("GitConflictCurrentLabel", palette.blue, palette.bg_visual_blue, "bold")
  set_hl("GitConflictIncomingLabel", palette.green, palette.bg_visual_green, "bold")
end

return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "gruvbox-material",
    },
  },
  {
    "sainnhe/gruvbox-material",
    lazy = false,
    opts = {
      transparent_background = 2,
      foreground = "material",
      background = "hard",
      enable_italic = true,
      enable_bold = true,
      ui_contrast = "high",
      diagnostic_virtual_text = "colored",
      current_word = "underline",
    },
    config = function(_, opts)
      -- Set Options based on lazy.nvim options
      for opt, val in pairs(opts) do
        if type(val) == "boolean" then
          val = val and 1 or 0
        end
        vim.g["gruvbox_material_" .. opt] = val
      end

      -- Customize Colors
      vim.api.nvim_create_autocmd("ColorScheme", {
        group = vim.api.nvim_create_augroup("custom_highlights_gruvboxmaterial", {}),
        pattern = "gruvbox-material",
        callback = customize_gruvbox,
      })

      -- Set colorscheme
      vim.cmd.colorscheme("gruvbox-material")
    end,
  },
}
