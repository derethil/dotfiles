return {
  {
    "stevearc/conform.nvim",
    keys = {
      { "<leader>cF", "<cmd>ConformInfo<cr>", { desc = "Conform" } }
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
        -- Other Custom Formatters
        -- ["*"] = { "codespell" },
      },
    },
  },
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "biome",
        "deno",
        -- "codespell",
        "prettierd",
        "eslint_d"
      },
    },
  },
}
