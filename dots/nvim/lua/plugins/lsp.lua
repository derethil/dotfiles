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
                classRegex = {
                  { "classed(?:\\.\\w*)?\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
                  { "cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]" },
                  { "cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)" },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    "laytan/tailwind-sorter.nvim",
    dependencies = { "nvim-treesitter/nvim-treesitter", "nvim-lua/plenary.nvim" },
    build = "cd formatter && npm ci && npm run build",
    ft = { "html", "css", "scss", "javascript", "typescript", "javascriptreact", "typescriptreact", "svelte" },
    config = function(_, opts)
      require("tailwind-sorter").setup(opts)
    end,
    keys = {
      { "<leader>tst", "<cmd>TailwindSortOnSaveToggle<cr>", desc = "Toggle Tailwind Sort on save" },
    },
    opts = {
      on_save_enabled = true,
    },
  },
}
