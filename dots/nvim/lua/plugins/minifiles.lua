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

---@param options (table) - Regex filter options to exclude files
--- - <hidden> (table) - List of hidden files to exclude
---@return function - Filter function to exclude files
---
local function filter_files(options)
  return function(fs_entry)
    for _, pattern in ipairs(options.hidden) do
      if string.match(fs_entry.name, pattern) then
        return false
      end
    end
    return true
  end
end

return {
  { "famiu/bufdelete.nvim", lazy = true },
  {
    "echasnovski/mini.files",
    event = "VeryLazy",
    opts = {
      content = {
        filter = filter_files({
          hidden = { "__pycache__" },
        }),
      },
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
