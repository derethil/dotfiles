-- Enable inlay hints for specific filetypes
vim.api.nvim_create_autocmd({ "BufEnter", "FileType" }, {
  desc = "Enable inlay hints for specific filetypes",
  group = vim.api.nvim_create_augroup("enable_inlay_hints", { clear = true }),
  pattern = { "go" },
  callback = function(event)
    vim.lsp.inlay_hint.enable(true, { bufnr = event.buf })
  end,
})

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
