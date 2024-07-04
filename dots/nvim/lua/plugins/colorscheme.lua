return {
  {
    "rebelot/kanagawa.nvim",
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
      for opt, val in pairs(opts) do
        if type(val) == "boolean" then
          val = val and 1 or 0
        end
        vim.g["gruvbox_material_" .. opt] = val
      end
      vim.cmd.colorscheme("gruvbox-material")
    end,
  },
  {
    "nvim-zh/colorful-winsep.nvim",
    config = true,
    event = { "WinNew" },
    opts = {
      hi = {
        fg = "#A9B665",
      },
    },
  },
}
