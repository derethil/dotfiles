return {
  -- Install Colorschemes
  {
    "rebelot/kanagawa.nvim",
    lazy = false,
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
    "catppuccin/nvim",
    lazy = true,
    opts = {
      integrations = {
        aerial = true,
        alpha = true,
        cmp = true,
        dashboard = true,
        flash = true,
        gitsigns = true,
        headlines = true,
        illuminate = true,
        indent_blankline = { enabled = true },
        leap = true,
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
        navic = { enabled = true, custom_bg = "lualine" },
        neotest = true,
        neotree = true,
        noice = true,
        notify = true,
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
