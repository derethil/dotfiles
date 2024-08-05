return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "gruvbox-material",
    },
  },
  {
    "nyoom-engineering/oxocarbon.nvim",
    config = function()
      vim.api.nvim_set_hl(0, "Normal", { bg = "none", fg = "#d0d0d0" })
      vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none", fg = "#d0d0d0" })
      vim.api.nvim_set_hl(0, "LineNr", { bg = "none", fg = "#686868" })
      vim.api.nvim_set_hl(0, "Comment", { bg = "none", fg = "#686868" })
    end,
  },
  {
    "xero/miasma.nvim",
  },
  {
    "mellow-theme/mellow.nvim",
    config = function()
      vim.g.mellow_bold_booleans = true
      vim.g.mellow_bold_functions = true
      vim.g.mellow_transparent = true
    end,
  },
  {
    "sainnhe/gruvbox-material",
    lazy = false,
    opts = {
      transparent_background = (not vim.g.neovide and 2 or 0),
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
