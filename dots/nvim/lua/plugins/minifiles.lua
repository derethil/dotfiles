vim.api.nvim_create_autocmd("User", {
  pattern = { "MiniFilesActionDelete", "MiniFilesActionMove" },
  callback = function(args)
    local action = args.data.action
    local from = args.data.from
    local to = args.data.to

    local bufnr = vim.fn.bufnr(from, true)

    if bufnr ~= -1 then
      require("bufdelete").bufdelete(bufnr, true)
      if action == "move" then
        vim.fn.bufadd(to)
      end
    end
  end,
})

return {
  { "famiu/bufdelete.nvim", lazy = true },
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
