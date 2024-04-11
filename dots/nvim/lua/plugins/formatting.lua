return {
  {
    "stevearc/conform.nvim",
    ---@class ConformOpts
    opts = {
      ---@type table<string, conform.FormatterUnit[]>
      formatters_by_ft = {
        -- Replace Prettier with Deno where possible, and biome otherwise
        ["javascript"] = { "deno_fmt" },
        ["javascriptreact"] = { "deno_fmt" },
        ["typescript"] = { "deno_fmt" },
        ["typescriptreact"] = { "deno_fmt" },
        ["vue"] = { "biome" },
        ["css"] = { "biome" },
        ["scss"] = { "biome" },
        ["less"] = { "biome" },
        ["html"] = { "biome" },
        ["json"] = { "deno_fmt" },
        ["jsonc"] = { "biome" },
        ["yaml"] = { "biome" },
        ["markdown"] = { "deno_fmt" },
        ["markdown.mdx"] = { "biome" },
        ["graphql"] = { "biome" },
        ["handlebars"] = { "biome" },
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
      },
    },
  },
}
