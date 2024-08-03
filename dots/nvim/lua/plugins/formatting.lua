return {
  {
    "stevearc/conform.nvim",
    keys = {
      { "<leader>cF", "<cmd>ConformInfo<cr>", { desc = "Conform" } },
    },
    opts = {
      formatters_by_ft = {
        ["javascript"] = { "deno_fmt" },
        ["javascriptreact"] = { "deno_fmt" },
        ["typescript"] = { "deno_fmt" },
        ["typescriptreact"] = { "deno_fmt" },
        ["vue"] = { "biome" },
        ["css"] = { "biome" },
        ["scss"] = { "prettierd" },
        ["less"] = { "prettierd" },
        ["html"] = { "prettierd" },
        ["json"] = { "deno_fmt" },
        ["jsonc"] = { "biome" },
        ["yaml"] = { "prettierd" },
        ["markdown"] = { "deno_fmt" },
        ["markdown.mdx"] = { "prettierd" },
        ["graphql"] = { "prettierd" },
        ["handlebars"] = { "prettierd" },
        ["rust"] = { "rustfmt" },
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
        "deno",
        "rustfmt",
        "rustywind",
        "prettierd",
        "eslint_d",
      },
    },
  },
}
