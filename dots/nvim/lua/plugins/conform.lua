local util = require("util.formatting")

return {
  {
    "stevearc/conform.nvim",
    keys = {
      { "<leader>cF", "<cmd>ConformInfo<cr>", { desc = "Conform" } },
      {
        "<leader>fd",
        function()
          local bufnr = vim.api.nvim_get_current_buf()
          util.format_diff(bufnr)
        end,
        { desc = "Format diff" },
      },
    },
    opts = {
      formatters_by_ft = {
        nix = { "alejandra" },
        javascript = util.eslint_d({ "prettierd" }),
        javascriptreact = util.eslint_d({ "prettierd" }),
        typescript = util.eslint_d({ "prettierd" }),
        typescriptreact = util.eslint_d({ "prettierd" }),
        vue = { "biome" },
        css = { "biome" },
        scss = { "prettierd" },
        less = { "prettierd" },
        html = { "prettierd" },
        json = { "prettierd" },
        jsonc = { "biome" },
        yaml = { "prettierd" },
        markdown = { "prettierd" },
        ["markdown.mdx"] = { "prettierd" },
        graphql = { "prettierd" },
        handlebars = { "prettierd" },
        rust = { "rustfmt" },
        ruby = util.get_ruby_formatter(),
      },
    },
  },
  {
    "codethread/qmk.nvim",
    event = "BufReadPre *keymap.c",
    config = function()
      require("qmk").setup({
        auto_format_pattern = nil,
        name = "LAYOUT",
        comment_preview = { position = "top" },
        layout = {
          "x x x x x x x x x x x x x x _ x",
          "x x x x x x x x x x x x x x _ x",
          "x x x x x x x x x x x x x x _ x",
          "x x x x x x x x x x x x xx^ _ x",
          "^xx x x x x x x x x x x xx^ x x",
          "x x x xxxxxx^xxxxxx x x x x x x",
        },
      })
    end,
  },
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "biome",
        "rustfmt",
        "rustywind",
        "prettierd",
        "eslint_d",
      },
    },
  },
}
