return {
  "brenoprata10/nvim-highlight-colors",
  config = function(_, opts)
    require("nvim-highlight-colors").setup(opts)
  end,
  event = "LazyFile",
  ft = { "typescriptreact", "javascriptreact", "css", "javascript", "typescript", "html" },
  opts = {
    render = "virtual",
    virtual_symbol = "",
    enable_named_colors = true,
    enable_tailwind = true,
  },
}
