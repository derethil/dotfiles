return {
  {
    "stevearc/conform.nvim",
    ---@class ConformOpts
    opts = {
      ---@type table<string, conform.FormatterUnit[]>
      formatters_by_ft = {
        -- Replace Prettier with Deno, Biome, and Prettierd (in that priority of support)
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
        ["*"] = { "codespell" },
      },
    },
  },
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "biome",
        "deno",
        "codespell",
        "prettierd",
      },
    },
  },
}
