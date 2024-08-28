return {
  {
    "echasnovski/mini.files",
    event = "VeryLazy",
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
