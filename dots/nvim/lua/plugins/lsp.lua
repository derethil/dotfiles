return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      inlay_hints = { enabled = false },
      servers = {
        ruff_lsp = {},
        pyright = {},
        tailwindcss = {
          settings = {
            tailwindCSS = {
              experimental = {
                classRegex = require("util.tailwind").cvaRegex,
              },
            },
          },
        },
      },
    },
  },
}
