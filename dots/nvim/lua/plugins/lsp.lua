return {
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "ruff-lsp",
        "pyright",
      },
    },
  },

  {
    "neovim/nvim-lspconfig",
    ---@class PluginLspOpts
    opts = {
      ---@class lspconfig.options
      -- servers = {
      --   glsl_analyzer = {},
      -- },
      -- setup = {
      --   glsl_analyzer = function()
      --     require("lspconfig.glsl_analyzer").setup()
      --   end,
      -- },
    },
  },
}
