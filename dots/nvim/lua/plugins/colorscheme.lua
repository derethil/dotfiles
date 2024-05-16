return {
  -- Install Colorschemes
  {
    "rebelot/kanagawa.nvim",
    opts = {
      colors = {
        theme = {
          all = {
            ui = { bg_gutter = "none" },
          },
        },
      },
    },
  },
  {
    'folke/tokyonight.nvim',
  },
  {
    "catppuccin/nvim",
    name = "catppuccin",
    opts = {
      integrations = {
        aerial = false,
        cmp = true,
        dap = true,
        dap_ui = true,
        dashboard = true,
        flash = true,
        gitsigns = true,
        headlines = true,
        illuminate = true,
        indent_blankline = { enabled = true },
        lsp_trouble = true,
        mason = true,
        markdown = true,
        mini = true,
        native_lsp = {
          enabled = true,
          underlines = {
            errors = { "undercurl" },
            hints = { "undercurl" },
            warnings = { "undercurl" },
            information = { "undercurl" },
          },
        },
        neotest = true,
        semantic_tokens = true,
        telescope = true,
        treesitter = true,
        treesitter_context = true,
        which_key = true,
      },
    },
  },
  -- Default Colorscheme
  {
    "LazyVim/LazyVim",
    opts = { colorscheme = { "kanagawa" } },
  },
}
