return {
  {
    "echasnovski/mini.files",
    event = "VeryLazy",
    opts = {
      windows = {
        preview = false,
      },
      options = {
        use_as_default_explorer = true,
      },
    },
    keys = {
      {
        "<leader>e",
        function()
          require("mini.files").open(vim.fn.expand("%"))
        end,
        desc = "Open File Explorer (Buffer dir)",
      },
      {
        "<leader>E",
        function()
          require("mini.files").open(LazyVim.root())
        end,
        desc = "Open File Explorer (Root dir)",
      },
    },
  },
}
