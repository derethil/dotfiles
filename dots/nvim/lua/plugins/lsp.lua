-- Hyprlang LSP
vim.api.nvim_create_autocmd({ "BufEnter", "BufWinEnter" }, {
  pattern = { "*.hl", "hypr*.conf", "**/hypr/conf.d/**.conf" },
  callback = function(event)
    vim.notify(string.format("starting hyprls for %s", vim.inspect(event["file"])))
    vim.lsp.start({
      name = "hyprlang",
      cmd = { "hyprls" },
      root_dir = vim.fn.getcwd(),
    })
  end,
})

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
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = { "graphql-language-service-cli" },
    },
  },
  {
    "neovim/nvim-lspconfig",
    opts = {
      inlay_hints = { enabled = false },
      setup = {
        -- HACK: disable denols renaming capability due to duplicate rename popping up
        denols = function()
          LazyVim.lsp.on_attach(function(client)
            client.server_capabilities.renameProvider = false
          end, "denols")
        end,
      },
      servers = {
        glsl_analyzer = {},
        ruff_lsp = {},
        pyright = {},
        graphql = {},
        nil_ls = {},
        tailwindcss = {
          settings = {
            tailwindCSS = {
              experimental = {
                classRegex = require("util.tailwind").mergedRegex,
              },
            },
          },
        },
      },
    },
  },
}
